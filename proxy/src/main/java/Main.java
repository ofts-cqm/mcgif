import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.net.ConnectException;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

public class Main {

    private static final String SKIN_VIEWER_BASE = "http://localhost:" + Config.API_PORT;
    private static final ConcurrentHashMap<String, Long> lastAccess = new ConcurrentHashMap<>();

    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        Javalin app = Javalin.create(config -> {
            config.http.defaultContentType = "application/json";
            config.staticFiles.add(staticFiles -> {
                staticFiles.hostedPath = "/";          // accessed path
                staticFiles.directory = "/public";     // resources/public
                staticFiles.location = Location.CLASSPATH;
            });
        }).start(Config.LISTEN_PORT);

        app.get("/refresh/name/{name}", ctx -> {
            String url = SKIN_VIEWER_BASE + "/refresh/name/" + ctx.pathParam("name");

            Request request = new Request.Builder().url(url).build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful() || response.body() == null) {
                    ctx.status(500).result("Skin viewer error");
                    return;
                }
                response.close();
                ctx.status(204).result("Reload Successful");
            } catch (ConnectException e){
                ctx.status(503).result("Failed to connect to target API");
            }
        });

        app.get("/api/render", ctx -> {
            long now = System.currentTimeMillis();
            AtomicBoolean allowed = new AtomicBoolean(true);
            String ip = ctx.header("X-Forwarded-For");

            if (ip == null) {
                ip = ctx.ip();
            } else {
                ip = ip.split(",")[0].trim();
            }

            lastAccess.compute(ip, (k, last) -> {
                if (last != null && now - last < Config.COOLDOWN_MS) {
                    allowed.set(false);
                    return last;
                }
                return now;
            });

            if (!allowed.get()) {
                ctx.status(429).result("Too many requests");
                return;
            }

            if (lastAccess.size() > Config.MAX_ENTRIES) {
                long cutoff = System.currentTimeMillis() - Config.CUTOFF_MS;
                lastAccess.entrySet().removeIf(e -> e.getValue() < cutoff);
            }

            String query = ctx.queryString();
            String url = SKIN_VIEWER_BASE + "/render/name/" + ctx.queryParam("name") + "/" + ctx.queryParam("pose") + (query != null ? "?" + query : "");

            Request request = new Request.Builder().url(url).build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful() || response.body() == null) {
                    ctx.status(500).result("Skin viewer error");
                    return;
                }

                // this is a VERY BAD solution.
                // responses should ALWAYS be read asynchronously to prevent memory overflow and reduce response time
                // However, it is simple and should work for such small website
                // TODO: change to asynchronous handling
                byte[] bytes = response.body().bytes();
                response.close();

                ctx.contentType(Objects.requireNonNull(response.header("Content-Type")));
                ctx.result(bytes);
            } catch (ConnectException e){
                ctx.status(503).result("Failed to connect to target API");
            }
        });
    }
}

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.util.Objects;

public class Main {

    private static final String SKIN_VIEWER_BASE = "http://localhost:2345";

    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        Javalin app = Javalin.create(config -> {
            config.http.defaultContentType = "application/json";
            config.staticFiles.add(staticFiles -> {
                staticFiles.hostedPath = "/";          // accessed path
                staticFiles.directory = "/public";     // resources/public
                staticFiles.location = Location.CLASSPATH;
            });
        }).start(3001);

        app.get("/api/render", ctx -> {
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
            }
        });
    }
}

import java.io.*;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public final class Config {

    public static final long COOLDOWN_MS;
    public static final int MAX_ENTRIES;
    public static final long CUTOFF_MS;
    public static final int LISTEN_PORT;
    public static final int API_PORT;

    private static final Logger log = LoggerFactory.getLogger(Config.class);

    static {
        Properties props = new Properties();
        try (InputStream in = new FileInputStream("application.properties")){
            props.load(in);
        } catch (FileNotFoundException ignored){
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        COOLDOWN_MS = Long.parseLong(
                props.getProperty("ratelimit.cooldown-ms", "3000")
        );
        MAX_ENTRIES = Integer.parseInt(
                props.getProperty("ratelimit.max-entries", "1000")
        );
        CUTOFF_MS = Long.parseLong(
                props.getProperty("ratelimit.cutoff-ms", "3000")
        );
        LISTEN_PORT = Integer.parseInt(
                props.getProperty("listening-port", "3001")
        );
        API_PORT = Integer.parseInt(
                props.getProperty("api-port", "2345")
        );

        log.info(
                """
                RateLimit config loaded:
                  cooldown-ms = {}
                  max-entries = {}
                  cutoff-ms   = {}
                """,
                COOLDOWN_MS,
                MAX_ENTRIES,
                CUTOFF_MS
        );

        log.info(
                """
                
                Listening port {}
                API port {}
                """,
                LISTEN_PORT,
                API_PORT
        );
    }

    private Config() {}
}

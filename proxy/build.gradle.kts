plugins {
    java
    application
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "net.ofts"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation("io.javalin:javalin:6.1.3")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("org.slf4j:slf4j-simple:2.0.10")
}

application {
    mainClass.set("Main")
}

tasks.shadowJar {
    archiveBaseName.set("proxy-server")
    archiveVersion.set(version.toString())
    archiveClassifier.set("") // 生成 proxy-server-1.0.0.jar

    mergeServiceFiles()
}


tasks.test {
    useJUnitPlatform()
}
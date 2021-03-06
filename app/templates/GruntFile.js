module.exports = function(grunt) {
    var pkg;
    pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({
        pkg: pkg,
        clean: {
            dist: {
                src: ["dist"]
            },
            coverage: {
                src: ["dist/coverage"]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: ["src/**", "static_content/**", "log/FOLDER.md", "index.js", "package.json", "README.md"],
                        dest: "dist/source"
                    }
                ]
            }
        },
        compress: {
            dist: {
                options: {
                    archive: "dist/artifacts/" + pkg.name + "-" + pkg.version + ".zip"
                },
                expand: true,
                cwd: "dist/source/",
                src: ["**/*"],
                dest: pkg.name
            }
        },
        mochaTest: {
            dev: {
                options: {
                    reporter: "spec"
                },
                src: ["test/unit/*.js", "test/unit/*.js", "test/api/*.js", "test/api/*.js", "test/route/*.js", "test/route/*.js"]
            },
            "test-xunit": {
                options: {
                    reporter: "xunit",
                    captureFile: "dist/coverage/test-results.xml",
                    quiet: true
                },
                src: ["test/unit/*.js", "test/unit/*.js", "test/api/*.js", "test/api/*.js", "test/route/*.js", "test/route/*.js"]
            },
            "coverage-cobertura": {
                options: {
                    reporter: "mocha-cobertura-reporter",
                    captureFile: "dist/coverage/coverage.xml",
                    quiet: true,
                    coverage: true
                },
                src: ["test/unit/*.js", "test/unit/*.js", "test/api/*.js", "test/api/*.js", "test/route/*.js", "test/route/*.js"]
            },
            "coverage-html": {
                options: {
                    reporter: "html-cov",
                    captureFile: "dist/coverage/coverage.html",
                    quiet: true,
                    coverage: true
                },
                src: ["test/unit/*.js", "test/unit/*.js", "test/api/*.js", "test/api/*.js", "test/route/*.js", "test/route/*.js"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.registerTask("default", ["clean:dist", "copy:dist", "compress:dist"]);
    grunt.registerTask("test", ["mochaTest:dev"]);
    return grunt.registerTask("coverage", ["clean:coverage", "mochaTest:test-xunit", "mochaTest:coverage-cobertura", "mochaTest:coverage-html"]);
};

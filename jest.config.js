const jestConfig = {
    verbose: true,
    testTimeout: 120000,
    coverageReporters: [
        "text",
        "html",
        "cobertura"
    ],
    collectCoverageFrom: [
        "app/*.js"
    ],
    reporters: [
        "default",
        "jest-junit"
    ],
}

module.exports = jestConfig;
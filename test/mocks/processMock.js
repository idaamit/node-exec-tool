function mockArgvInput(configFields) {
    jest.replaceProperty(process, "argv", configFields);
}

function mockKillProcess(shouldFail) {
    jest.spyOn(process, "kill").mockImplementation(() => {
        if (shouldFail)
            throw new Error("Mock kill process error");
    })
}

module.exports = {
    mockArgvInput: mockArgvInput,
    mockKillProcess: mockKillProcess
}
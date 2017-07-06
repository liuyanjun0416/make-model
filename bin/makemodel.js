#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const minimist = require("minimist");
const makemodel = require("../index");

const argv = minimist(process.argv.slice(2), {
    boolean: ["help", "version"],
    string: ["path"],
    alias: {
        help: "h",
        version: "v",
        path: "p"
    },
    unknown: param => {
        if (param.startsWith("-")) {
            console.warn("Ignored unknown option: " + param + "\n");
            return false;
        }
    }
});

if (argv["version"]) {
    console.log(makemodel.version);
    process.exit(0);
}

if (argv["help"]) {
    console.log(
        `Usage: makemde [options]

        -h,--help                    output usage information
        -v,--version                 output the version number
        -p <path>,--path <path>      file path
    `
    );
    process.exit(argv["help"] ? 0 : 1);
}

if (argv["path"]) {
    let filePath = path.resolve(__dirname, process.cwd(), argv["path"]);
    let outputPath = path.resolve(__dirname, process.cwd(), argv["path"].replace(/(\w+)\.(js|jsx)$/, "model.json"));
    let input;
    try {
        input = fs.readFileSync(filePath, "utf8");
    } catch (e) {
        process.stdout.write("\n");
        console.error("Unable to read file: " + filePath + "\n" + e);
        // process.exitCode = 2;
        process.exit(1);
    }
    let model = makemodel.parse(input);
    if (!model) {
        process.exit(1);
    }
    fs.writeFileSync(outputPath, JSON.stringify(model, null, 4));
    console.log(`成功写入${outputPath}`)
    process.exit(0);
}


const fs = require('fs'); // Loading Node Module
const validator = require('validator'); // Validates & Sanitizes Strings
const chalk = require('chalk'); // For Customizations of Console Outputs
const yargs = require('yargs'); // For Arguments Parsing/Handeling
const notes = require('./notes'); // Loading notes.js File

// 1. Adding a note
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
    }
});
// 2. Removing a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});
// 3. Reading a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: "Title for Reading",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){ notes.readNote(argv.title); }
});
// 2. Listing a note
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler(){ notes.listNotes(); }
});
yargs.parse();
// console.log(yargs.argv);
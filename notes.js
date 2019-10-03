const fs = require('fs');
const chalk = require('chalk');

// ADDING A NOTE
const addNote = (title,body)=>{
    try{
        const notes = loadNotes();
        const duplicateNotes = notes.find((note) => (note.title === title));
        if(!duplicateNotes){
            notes.push({
                title: title,
                body: body
            });
            saveNotes(notes);
            console.log(chalk.green(`Note Added !`));
        }else{
            console.log(chalk.red(`Note Title already exists !`));
        }
    }catch(e){
        console.log(`${chalk.red('Some Error Occurred while Adding a Note')} : ${e}`);
    }
}

// REMOVING A NOTE
const removeNote = (title)=>{
    try{
        const notes = loadNotes();
        const newNotes = notes.filter((note) => (note.title !== title));
        if(newNotes.length === notes.length){
            console.log(chalk.red(`Note Title not found !`));        
        }else{
            saveNotes(newNotes);
            console.log(chalk.green(`Note Removed !`));        
        }
    }catch(e){
        console.log(`${chalk.red('Some Error Occurred while Removing Notes')} : ${e}`);
    }

}

// LISTING THE NOTES
const listNotes = ()=>{
    try{
        const notes = loadNotes();
        let i = 0;
        if(notes.length){
            console.log(chalk.red.bgWhite.inverse(`****************L I S T****************\n`));
            notes.forEach(note => {
                console.log(`${++i}. ${chalk.magenta(note.title)} : ${chalk.green(note.body)}\n`);
            });
        }else{
            console.log(chalk.red.bgWhite.inverse(`No List Found !`));
        }
    }catch(e){
        console.log(`${chalk.red('Some Error Occurred while Listing Notes')} : ${e}`);
    }
}

// Reading Notes
const readNote = (title) => {
    try{
        const notes = loadNotes();
        const result = notes.find((note) => (note.title === title));
        if(result){
            console.log(`${chalk.black.bgWhite.inverse(result.title)} : ${chalk.green(result.body)}`);
        }else{
            console.log(chalk.red.bgWhite.inverse(`No Result Found !`));
        }
    }catch(e){
        console.log(`${chalk.red('Some Error Occurred while Reading Notes')} : ${e}`);
    }
}

// SAVING A NOTE
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('test.json',dataJSON);
}

// LOADING NOTES
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('test.json'); // Byte from file
        const dataJSON = dataBuffer.toString(); // JSON Data
        return (JSON.parse(dataJSON)); // JS Obj
    }catch(e){
        return [];
    }
}

module.exports = {
    addNote    : addNote,
    removeNote : removeNote,
    listNotes  : listNotes,
    readNote   : readNote
};
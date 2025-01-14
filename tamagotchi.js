const readline = require('readline');

let tamagotchi = {
    name: 'Tamagotch',
    happiness: 100,
    hunger: 0,
    emoji: '🤖'
};

function state() {
    console.log(`\nName: ${tamagotchi.name}`);
    console.log(`Happiness: ${tamagotchi.happiness}%`);
    console.log(`Hunger: ${tamagotchi.hunger}%`);
    console.log(`Emoji: ${tamagotchi.emoji}`);
    console.log('---------------------------------');
}

function toFeed() {
    tamagotchi.hunger -= 10;
    tamagotchi.happiness += 5;

    if (tamagotchi.hunger < 0) tamagotchi.hunger = 0;
    if (tamagotchi.happiness > 100) tamagotchi.happiness = 100;

    console.log(`\n${tamagotchi.name} was fed!`);
}

function kindness() {
    tamagotchi.happiness += 10;

    if (tamagotchi.happiness > 100) tamagotchi.happiness = 100;

    console.log(`\n${tamagotchi.name} received affection!`);
}

function toStroll() {
    tamagotchi.happiness += 20;
    tamagotchi.hunger += 10;

    if (tamagotchi.happiness > 100) tamagotchi.happiness = 100;
    if (tamagotchi.hunger > 100) tamagotchi.hunger = 100;

    console.log(`\n${tamagotchi.name} went for a walk!`);
}

function emoji(newEmoji) {
    tamagotchi.emoji = newEmoji;
    console.log(`\n${tamagotchi.name} now has the emoji: ${tamagotchi.emoji}`);
}

function checkStatus() {
    tamagotchi.hunger += 10;
    tamagotchi.happiness -= 5;

    if (tamagotchi.hunger >= 100 || tamagotchi.happiness <= 0) {
        console.log(`\n ${tamagotchi.name} has passed away...`);
        process.exit();
    }
}

function name(newName) {
    tamagotchi.name = newName;
    console.log(`\n ${tamagotchi.name} is now the name of your Tamagotchi`)
}


function startGame() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\nWelcome to Tamagotchi!');
    console.log('Take care of your virtual pet to keep it happy and healthy!\n');


    setInterval(checkStatus, 1000);

    function action() {
        state();
        rl.question(
            'Choose an action: \n1 - Feed \n2 - Give Affection \n3 - Go for a Walk \n4 - Change Emoji \n5 - Change Name  \n6 - Exit Game\n\nYour choice: ',
            function (answer) {
                switch (answer) {
                    case '1':
                        toFeed();
                        break;
                    case '2':
                        kindness();
                        break;
                    case '3':
                        toStroll();
                        break;
                    case '4':
                        rl.question('Enter new emoji: ', function (newEmoji) {
                            emoji(newEmoji);
                            action();
                        });
                        return;
                    case '5':
                        rl.question('Enter a new name for your Tamagotchi: ', function(newName) {
                            name(newName);
                            action();
                        })
                        break;
                    case '6':
                        console.log('Thanks for playing! Goodbye!');
                        rl.close();
                        return;
                    default:
                        console.log('Invalid choice! Please select a valid option.');
                }
                action();
            }
        );
    }

    action();
}

startGame();

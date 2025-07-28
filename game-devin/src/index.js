document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const fileList = document.getElementById('file-list');
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    const exportButton = document.querySelector('.sidebar ul li:nth-child(4)');

    if (user.accountType === 'free') {
        exportButton.style.display = 'none';
    } else {
        exportButton.addEventListener('click', () => {
            console.log('Exporting to GitHub...');
        });

        const premiumFeatures = document.querySelectorAll('.premium-feature');
        premiumFeatures.forEach(feature => {
            feature.style.display = 'block';
        });

        const reportBugButton = document.querySelector('.premium-feature:nth-child(5)');
        reportBugButton.addEventListener('click', () => {
            console.log('Reporting a bug...');
        });

        const suggestFeatureButton = document.querySelector('.premium-feature:nth-child(6)');
        suggestFeatureButton.addEventListener('click', () => {
            console.log('Suggesting a feature...');
        });
    }

    const files = {
        'game.js': `// game.js
function main() {
    console.log("Game started!");
}

main();`,
        'player.js': `// player.js
class Player {
    constructor(name) {
        this.name = name;
    }
}
`,
        'enemy.js': `// enemy.js
class Enemy {
    constructor(name) {
        this.name = name;
    }
}
`
    };

    fileList.innerHTML = '';
    for (const fileName in files) {
        const li = document.createElement('li');
        li.textContent = fileName;
        li.addEventListener('click', () => {
            editor.setValue(files[fileName], 1);
        });
        fileList.appendChild(li);
    }

    editor.setValue(files['game.js'], 1);
});

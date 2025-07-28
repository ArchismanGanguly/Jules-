document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');
    const codeEditor = document.getElementById('code-editor');
    const exportButton = document.querySelector('.sidebar ul li:nth-child(4)');

    const accountType = 'free'; // or 'premium'

    if (accountType === 'free') {
        exportButton.style.display = 'none';
    } else {
        exportButton.addEventListener('click', () => {
            console.log('Exporting to GitHub...');
            // In a real application, this would use the GitHub API
            // to create a repository and push the files.
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
            codeEditor.textContent = files[fileName];
        });
        fileList.appendChild(li);
    }
});

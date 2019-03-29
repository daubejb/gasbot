const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const yosay = require('yosay');



module.exports = class extends Generator {

    initializing() {
        // Yeoman replaces dashes with spaces.  Elements require dashes.
    }

    prompting() {
        const done = this.async();

        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the awesome ${chalk.red('Google Apps Script Hangouts Chat Bot')} generator!`)
        );

        return this.prompt(
            [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Chat bot name should be in normal TitleCase',
                    default: 'ChatBot',
                },
                {
                    type: 'input',
                    name: 'version',
                    message: 'Version number',
                    default: '0.0.1',
                    store: true
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Brief description of the Google Apps Script Chat Bot',
                    default: 'A scaffolded Google Apps Script Chat Bot provided by daubedesign',
                },
                {
                    type: 'input',
                    name: 'scriptId',
                    message: 'Go to File > Project properties > Script ID and enter that ID here',
                    default: 'No script Id entered'
                },
                {
                    type: 'input',
                    name: 'author',
                    message: 'Author of the element',
                    default: 'Jeffrey B Daube',
                    store: true
                }
            ]
        ).then(answers => {
            this.props = answers;
            done();
        });
    }

    configuring() {

    }

    default() {
        const { name } = this.props;

        if (path.basename(this.destinationPath()) !== name) {
            this.log(`Your component should be in a '${name}' folder, creating now...`);
            mkdirp(name);
            this.destinationRoot(this.destinationPath(name));
        }
    }

    writing() {
        const { name } = this.props;
        const { author } = this.props;
        const { version } = this.props;
        const { description } = this.props;
        const { scriptId } = this.props;

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('Code.js'),
            this.destinationPath('Code.js'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('appsscript.json'),
            this.destinationPath('appsscript.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('.jsconfig.json'),
            this.destinationPath('.jsconfig.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('.claspignore'),
            this.destinationPath('.claspignore'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('.clasp.json'),
            this.destinationPath('.clasp.json'),
            this
        )
    }

    install() {
        this.log(chalk.bold('\n---Chat Bot created---'));
        this.log('Installing dependencies...');
        this.npmInstall();
    }

    end() {
        this.log(chalk.bold('\n---Setup Complete---'));
        this.log('Read the project README for information about what to do next.\n');
    }
};

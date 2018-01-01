const browserstackConfig = require('./browserstack.config.js');

let nightwatch_config = {
    "src_folders": ["app"],
    "output_folder": "reports",
    "custom_commands_path": "",
    "custom_assertions_path": "",
    // "page_objects_path": "test/nightwatch/pageObjects",
    "globals_path": "globalsModule.js",

    selenium: {
        // injected below depending on environment
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                'os': 'OS X',
                'os_version': 'High Sierra',
                'browser': 'chrome',
                'browser_version': '62.0',
                'resolution': '1024x768'
            }
        },
        local: {
            "launch_url": "http://localhost",
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        }
    }
}

// assign selenium server settings
if (process.env.ENV == 'local') { // local
    Object.assign(nightwatch_config.selenium, {
        "start_process": true,
        "server_path": "./bin/selenium-server-standalone.jar",
        "log_path": "",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": "./bin/chromedriver"
        }
    });
} else { // browserstack
    Object.assign(nightwatch_config.selenium, {
        "start_process": false,
        "host": "hub-cloud.browserstack.com",
        "port": 80
    });
}

// Code to copy seleniumhost/port into test settings
for (let i in nightwatch_config.test_settings) {
    const config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;

    // browserstack credentials
    Object.assign(config.desiredCapabilities, browserstackConfig);
}

module.exports = nightwatch_config;
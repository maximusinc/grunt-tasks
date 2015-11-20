module.exports = function (grunt){
	var parseString = require('xml2js').parseString;

    // Load all grunt tasks from tasks dir
    // grunt.loadTasks('./tasks');
    // Default task.
    //grunt.registerTask('default', 'run:bower_install');
    grunt.registerMultiTask('dependency', 'multitask performing "dependency" display', function () {
        //read widgets name
        var path = require("path");
        var fs = require("fs");
        var widgetName = path.basename(path.normalize(__dirname + '../../..'));

        //unzip archives for analysis


        /**
         *read dependencies recursively from previously loaded and unpacked artifacts by given dependency name
         * @param dependencyName {string} dependency name as mentioned in feature XML file <dependency> section or in widget's XML file <require> tag
         * @returns {{object}}
         */
        function readDependency(dependencyName) {
            var dependency = {};
            dependency.name = dependencyName;
            dependency.gadget = [];
            dependency.container = [];

            grunt.task.current.files.forEach(function (file) {
                var src = file.src,
                    srcFiles = grunt.file.expand(src);

                //load each feature.xml file into parser and check if it describes required feature
                srcFiles.forEach(function (filepath) {
                    var xml = grunt.file.read(filepath);
                    parseString(xml, function (err, result) {

                        var featureName = result['feature']['name'][0];

                        /**
                         * reads given section of feature.xml to dependency object
                         * @param section {string} section name
                         */
                        function readSection(section) {
                            if (result['feature'][section] && result['feature'][section][0]['script']) {
                                result['feature'][section][0]['script'].forEach(function (element) {
                                    var scriptName = element['$']['src'];
                                    var scriptPath = path.normalize(__dirname + '/' + path.dirname(filepath) + '/' + scriptName);
                                    var scriptSizeKB = (fs.statSync(scriptPath).size / 1024).toFixed(2);
                                    dependency[section].push({
                                        'fileName': scriptName,
                                        'fileSizeKb': scriptSizeKB
                                    });
                                });
                            }
                        }

                        if (dependencyName === featureName) {

                            //add gadget & container dependencies to dependency object
                            readSection('gadget');
                            readSection('container');

                            //if feature has it's own dependencies
                            if (result['feature']['dependency']) {
                                dependency.dependency = [];
                                result['feature']['dependency'].forEach(function (subdependency) {
                                    var subdependencyObject = readDependency(subdependency);

                                    //to avoid dependency duplicates
                                    if (!(dependencyIndex.indexOf(subdependencyObject.name) > -1)) {
                                        dependency.dependency.push(subdependencyObject);
                                        dependencyIndex.push(subdependencyObject.name);
                                    }
                                });
                            }
                        }
                    });
                });
            });
            return dependency;
        }


        /**
         * Output tree-view formatted dependency to console
         * @param dependency {Object}
         * @param defaultIndent {string} additional indent is passed to make tree-view
         */
        function dependencyConsoleOutput(dependency, defaultIndent) {
            defaultIndent = typeof defaultIndent !== 'undefined' ? defaultIndent : "";
            var nameIndent = defaultIndent + new Array(Math.round(dependency.name.length / 2)).join(" ") + "|";
            var gadgetIndent = nameIndent + new Array(Math.round('gadget'.length / 2 + 3)).join(" ");
            var containerIndent = nameIndent + new Array(Math.round('container'.length / 2 + 3)).join(" ");
            var dependencyIndent = nameIndent + new Array(Math.round('dependency'.length / 2 + 3)).join(" ");

            var containerTotal = 0,
                gadgetTotal = 0;

            grunt.log.writeln(defaultIndent + '--' + dependency.name ['yellow'].bold);
            if (dependency.container.length === 0 && dependency.gadget.length === 0) {
                grunt.log.writeln(defaultIndent + 'Feature file not found. Check artifacts and bower' ['red']);
            }
            grunt.log.writeln(nameIndent);

            //output gadget script files
            grunt.log.writeln(nameIndent + '--' + 'gadget');
            dependency.gadget.forEach(function (element) {
                grunt.log.verbose.writeln(gadgetIndent + '|--' + element.fileName + ' size: ' + element.fileSizeKb + 'Kb');
                gadgetTotal += parseFloat(element.fileSizeKb);
            });
            if (dependency.gadget.length !== 0) {
                grunt.log.writeln(gadgetIndent + '|--' + 'Total gadget size: '['green'] + gadgetTotal.toFixed(2)['green'] + 'Kb' ['green']);
            }

            //output container script files
            grunt.log.writeln(nameIndent + '--' + 'container');
            dependency.container.forEach(function (element) {
                grunt.log.verbose.writeln(containerIndent + '|--' + element.fileName + ' size: ' + element.fileSizeKb + 'Kb');
                containerTotal += parseFloat(element.fileSizeKb);
            });
            if (dependency.container.length !== 0) {
                grunt.log.writeln(containerIndent + '|--' + 'Total container size: '['green'] + containerTotal.toFixed(2)['green'] + 'Kb' ['green']);
            }
            //output dependency if present
            if (dependency.dependency) {

                grunt.log.writeln(nameIndent + '--' + 'dependency');
                if (dependency.dependency.length === 0) {
                    grunt.log.writeln(nameIndent + 'already exist' ['green']);
                }
                dependency.dependency.forEach(function (element) {
                    var optIndent = dependencyIndent.replace(/\|([^\|]*)$/, '$1') + '|'; //regex - replace last "|" with " "
                    dependencyConsoleOutput(element, optIndent);
                });
            }
            else grunt.log.writeln(nameIndent + '--' + 'no dependency');
        }

        //todo make array of all widget dependencies, sanitize it to exclude duplicates then calculate totals for sanitaized dependancies and return total weight of container and gadget for widget
        function readWidget(featuresList) {

        }

        /**
         * Recursively calculates total gadget and container size, including dependencies
         * @param feature {object}
         * @returns {{}}
         */
        function calculateTotals(feature) {
            var featureTotals = {};
            featureTotals.container = 0;
            featureTotals.gadget = 0;
            featureTotals.name = feature.name;

            function iteration(feature) {
                feature.container.forEach(function (feature) {
                    featureTotals.container += feature.fileSizeKb - 0;
                });
                feature.gadget.forEach(function (feature) {
                    featureTotals.gadget += feature.fileSizeKb - 0;
                });

                if (feature.dependency) {
                    feature.dependency.forEach(function (feature) {
                        iteration(feature);
                    });
                }
            }

            iteration(feature);
            return featureTotals
        }

        var xml = grunt.file.read(grunt.config('widgetFolder') + '/' + grunt.config('widgetDescriptor') );

        var parseString = require('xml2js').parseString;

        var features, requireJson;
        parseString(xml, function (err, result) {
            requireJson = result['Module']['ModulePrefs'][0]['Require'];
        });
        features = requireJson.map(function (element) {
            return element['$']['feature'];
        });

        var dependencyIndex = [];

        if (this.target == 'show_feature') {
            var result = readDependency(this['args'][0]);
            //@todo get feature with overall weight for gadget and container
            dependencyConsoleOutput(result);
            if (grunt['task']['current']['args'][0] !== 'brief') {
                result = calculateTotals(result);
                grunt.log.writeln('For dependency '+result.name ['green']+'(including sub dependencies) :');
                grunt.log.writeln('Total container is '+result.container.toFixed(2)+' Kb');
                grunt.log.writeln('Total gadget is '+result.gadget.toFixed(2)+' Kb');
            }
            //grunt.log.writeln(JSON.stringify(dependencyIndex, null, 2));
        }

        if (this.target == 'show_widget') {
            grunt.log.writeln('Widget ' + grunt.config('widgetDescriptor') ['green'].bold + ' requires ' + 'features:');
            var totalWidgetContainer = 0,
                totalWidgetGadget = 0;
            features.forEach(function (element) {
                grunt.log.write(element['yellow']);

                var totalContainer = 0;
                var totalGadget = 0;
                var dependencyObj = readDependency(element);
                if (dependencyObj.container.length === 0 && dependencyObj.gadget.length === 0) {
                    grunt.log.writeln('  Feature file not found. Check artifacts and bower' ['red']);
                }
                dependencyObj.container.forEach(function (jsLib) {
                    totalContainer += parseFloat(jsLib.fileSizeKb);
                });
                dependencyObj.gadget.forEach(function (jsLib) {
                    totalGadget += parseFloat(jsLib.fileSizeKb);
                });

                if (dependencyObj.container.length !== 0) {
                    grunt.log.write('  container ' + totalContainer.toFixed(2) + ' Kb  |');
                    totalWidgetContainer += totalContainer;
                }
                if (dependencyObj.gadget.length !== 0) {
                    grunt.log.write('  gadget ' + totalGadget.toFixed(2) + ' Kb  |');
                    totalWidgetGadget += totalGadget;
                }
                //@todo dependency total weight output for dependency and widget
                grunt.log.writeln();
                if (grunt['task']['current']['args'][0] !== 'brief') {
                    grunt.task.run('dependency:show_feature:' + element);
                }
            });
            grunt.log.write('Total container ' + totalWidgetContainer.toFixed(2) + ' Kb  |');
            grunt.log.write(' Total gadget ' + totalWidgetGadget.toFixed(2) + ' Kb  |');
        }
    });

};

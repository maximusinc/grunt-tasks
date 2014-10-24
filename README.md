## Roox Grunt Tasks for Widgets ##

### Naming covention ###

Files registered  grunt task created in tasks folder. Task configuration data stored in tasks/options folder.
File name has meaning and mimic grunt task name. For example if _build-widget.js_, file name meanin what this file registrer task with name _buildWidget_

### Tasks configuration ###

Default tasks configuration info stored in tasks/options folder. Default tasks configuration overriding in Gruntfile.js.

Gruntfile.js - well formed Gruntfile injected to widget root.

### List of available tasks: ###

- __clearDist__ - clear _dist_ folder from concat sources
- __prepareBuildHtml__ - update configuration info for __copy__, __useminPrepare__, __usemin__, __smoosher__ tasks according task filepath
- __prepareImageEmbed__ - update configuration info for __imageEmbed__ task, set src and dest targets

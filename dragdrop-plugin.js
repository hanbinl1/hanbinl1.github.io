/*/********************************************************************/

define(function () {

    return {

        name: "Drag and Drop file",
        author: "Hanbin Li",
        email: "hanbinl1@student.unimelb.edu.au",
        description: "Allow users to drag and drop file on the main window.",

        initialize: function() {
            // Check for the various File API support.
	    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
		window.toastr.error('The File APIs are not fully supported by your browser.');
		return;
	    }

	    var dropRegion = document.getElementById("editors");


	    dropRegion.addEventListener('dragenter', preventDefault, false);
	    dropRegion.addEventListener('dragleave', preventDefault, false);
	    dropRegion.addEventListener('dragover', preventDefault, false);
	    dropRegion.addEventListener('drop', handleDrop, false);



	    function preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();
	    }



	    function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();

	        var files = e.dataTransfer.files;

		for (var i = 0, len = files.length; i < len; i++) {
		    if (files[i]) {
		        previewAnduploadFile(files[i]);
		    } else {
	     	        window.toastr.error("Failed to load file");
		    }
		}   
	    }  


	    function previewAnduploadFile(file) {
		var r = new FileReader();
	        r.onload = function(e) {
		    var contents = e.target.result;
		    createEditor();
		    $('#tab-' + window.current_editor).text(file.name);
		    var editor = window.ace.edit(window.current_editor);
		    editor.getSession().setValue(contents);
                }
	        r.readAsText(file);
	    }

        },



        disable: function() { 
	    var dropRegion = document.getElementById("editors");
	    dropRegion.removeEventListener('dragenter', preventDefault, false);
	    dropRegion.removeEventListener('dragleave', preventDefault, false);
	    dropRegion.removeEventListener('dragover', preventDefault, false);
	    dropRegion.removeEventListener('drop', preventDefault, false);
	    function preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();
	    }
		

	},

        save: function() {
            return {};
        },

        load: function(settings) {

        }

    };
});

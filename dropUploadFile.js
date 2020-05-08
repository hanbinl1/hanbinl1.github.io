(function() {


  // Check for the various File API support.
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    window.toastr.error('The File APIs are not fully supported by your browser.');
    return;
  }
  var reader, files;
  var dropZone = document.getElementById('editor-tabs'),
    //		progress = document.getElementById('progress'),
    //		progressBar = document.getElementById('progressBar'),
    outputTag = document.getElementById('output');

  /**
   * Event handlers for ReadFile.
   */

  // Stop reading files.
  function abortRead() {
    reader.abort();
  }

  // FileReader abort Handler
  function abortHandler(e) {
    alert('File read Canceled');
  }

  // FileReader Error Handler
  function errorHandler(e) {
    switch (e.target.error.code) {
      case e.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case e.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case e.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    }
  }

	// Display the progress of FileReading.
	function progressHandler(e) {
		if (e.lengthComputable) {
			var loaded = Math.round((e.loaded / e.total) * 100);
			var zeros = '';
			
			// Percent Loaded in string
			if (loaded >= 0 && loaded < 10) zeros = '00';
			else if (loaded < 100) zeros = '0';

			// Display progress in 3-digit and increase the bar length.
			progress.textContent = zeros + loaded.toString();
			progressBar.style.width = loaded + '%';

		}
	}

  // Event after loading a file completed (Append thumbnail.)
  function loadHandler(theFile) {

    return function(e) {
      var newFile = document.createElement('div');
      var picture = document.createElement('picture');
      var img = document.createElement('div');
      var contents = e.target.result;
//      img.style.backgroundImage = 'url(' + e.target.result + ')';
 //     img.title == theFile.name;
//      img.className = 'thumb';

//      picture.appendChild(img);
//      newFile.appendChild(picture);
//      newFile.className = 'file';

      //outputTag.insertBefore(newFile, null);

      outputTag.textContent += theFile.name + "\r\n";
      }
  }

  // Main function for ReadFile and appending thumbnails.
  function appendThumbnail(f) {
    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onabort = abortHandler;
    reader.onprogress = progressHandler;
    reader.onload = loadHandler(f);
    reader.readAsText(f);
  }

  /**
   * Main Event Handler to deal with
   * the whole drop & upload process.
   */
  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    dropZone.classList.remove('dragover');
    progress.textContent = '000';
		progressBar.style.width = '0%';



    files = e.dataTransfer.files; // FileList object.

    // Go through each file.
    for (var i = 0, len = files.length; i < len; i++) {
      appendThumbnail(files[i]);

    } // END for

  } // END handleFileSelect

  /**
   * functions associating "drag" event.
   */
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }


  /**
   * Setup the event listeners.
   */
  dropZone.addEventListener('dragenter', preventDefault, false)
  dropZone.addEventListener('dragleave', preventDefault, false)
  dropZone.addEventListener('dragover', preventDefault, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
}) ();


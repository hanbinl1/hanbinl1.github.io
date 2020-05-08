
/* global $ */

function analyzePlan() {

    var domText = window.ace.edit($('#domainSelection').find(':selected').val()).getSession().getValue();
    var probText = window.ace.edit($('#problemSelection').find(':selected').val()).getSession().getValue();

    $('#chooseFilesModal').modal('toggle');
    $('#plannerURLInput').show();
    window.toastr.info('Running analysis...');

    $.ajax( {url: "http://torchlight.haz.ca/solve",
             type: "POST",
             contentType: 'application/json',
             data: JSON.stringify({"domain": domText, "problem": probText})})
        .done(function (res) {
                if ('output' in res)
                    window.toastr.success('Analysis complete!');
                else
                    window.toastr.error('Problem with the server.');

                showAnalysis(res['output']);

            }).fail(function (res) {
                window.toastr.error('Error: Malformed URL?');
            });
}

function showAnalysis(output) {

    var tab_name = 'Analysis (' + (Object.keys(window.tl_analyses).length + 1) + ')';

    window.new_tab(tab_name, function(editor_name) {
        window.tl_analyses[editor_name] = output;
        var plan_html = '';
        plan_html += '<div class=\"plan-display\">\n';
        plan_html += '<h2>Torchlight Output (<a target=\"_blank\" href=\"http://editor.planning.domains/TorchLight-README.txt\">readme</a>)</h2>\n';
        plan_html += '<pre class=\"plan-display-action well\">\n';
        plan_html += output;
        plan_html += '</pre>';
        $('#' + editor_name).html(plan_html);
    });

}

define(function () {

    // Create a store for the torchlight analysis done
    window.tl_analyses = {};

    return {

        name: "Torchlight",
        author: "Jörg Hoffmann (torchlight) Christian Muise (plugin)",
        email: "hoffmann@cs.uni-saarland.de,christian.muise@gmail.com",
        description: "Calls the torchlight software to analyze classical problems.",

        // This will be called whenever the plugin is loaded or enabled
        initialize: function() {

            // Add our button to the top menu
            window.add_menu_button('Torchlight', 'torchlightMenuItem', 'glyphicon-eye-open', "chooseFiles('torchlight')");

            // Register this as a user of the file chooser interface
            window.register_file_chooser('torchlight',
            {
                showChoice: function() {
                    window.setup_file_chooser('Analyze', 'Analyze Problem');
                    $('#plannerURLInput').hide();
                },
                selectChoice: analyzePlan
            });
        },

        // This is called whenever the plugin is disabled
        disable: function() {
            window.remove_menu_button('torchlightMenuItem');
        },

        save: function() {
            // Used to save the plugin settings for later
            return {};
        },

        load: function(settings) {
            // Restore the plugin settings from a previous save call
        }

    };
});

module.exports = function(grunt) {

    grunt.initConfig({
        replace: {
            readme: {
                src: ['README.md'],
                overwrite: true,
                replacements: [{
                    from: 'app',
                    to: 'project'
                }]
            }
        },
        shell: {
            gitAdd: {
                command: 'git add README.md'
            },
            gitCommit: {
                command: "git commit README.md -m 'Updated readme'"
            }
        }
    });

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', function() {
        grunt.task.run('replace', 'shell:gitAdd', 'shell:gitCommit');
    });
};
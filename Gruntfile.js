module.exports = function (grunt) {
  grunt.initConfig({
    'html-builder': {
      languages: ['it','en'],
      cpus: 4,
      parallel: 3,
      blocks: {},
      sitemap:
      {
        urlPrefix: 'https://www.plurimedia.it/',
        changefreq: 'daily',
        priority: 1
      },
      json:
      [
        { collection: 'orariEChiusure', transform: 'orari-parsed', dest: 'orari-parsed' },
        { collection: 'menu', transform: 'menu-parsed', dest: 'menu-parsed' },
        { collection: 'conserva', transform: 'conserva-parsed', dest: 'conserva-parsed' },
      ]
    },
    watch: {
      files: ['Gruntfile.js','src/**/*.html','src/**/*.js','src/**/*.json','src/client/css/**/*.css'],
      tasks: ['build']
    },
    connect: {
       server: {
          options: {
              port: 8080,
              base: './dist'
          }
       }
    },
    clean: ['./dist'],
    copy: {
      client: {
         files: [ {expand: true, cwd: 'src/client/', src: ['**'], dest: 'dist/'}],
      },
      redirects: {
        src: '_redirects',
        dest: 'dist/_redirects',
     }
    },
    run: {
      contentful: {
        options: {
          wait: true
        },
        args: [
          'src/scripts/contentful.js'
        ]
      }
    },
  });

    // Default task.
    grunt.registerTask('default', ['contentful','html-builder-json','html-builder','copy']);
    grunt.registerTask('build', ['html-builder-json','html-builder','copy']);
    grunt.registerTask('copy', 'copy');
    grunt.registerTask('listen', ['connect','watch']);
    grunt.registerTask('contentful', ['run:contentful']);

    // contrib
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-run');

    // github
    grunt.loadNpmTasks('grunt-html-builder');


};

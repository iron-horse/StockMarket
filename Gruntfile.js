module.exports = function(grunt) {
 
  // Add the grunt-mocha-test tasks. 
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
 
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/app.min.js': ['src/**/*.js', 'src/*.js']
        }
      }
    },
    copy: {
      views: {
        files: [
          {expand: true, cwd: 'src/views', src:['**'], dest: 'dist/views/'},
        ],
      },
      styles: {
        files: [
          {expand: true, cwd: 'src/styles', src: ['**'],  dest: 'dist/styles/'},
        ],
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: false
        },
        src: ['test/unit/*.test.js']
      }
    },
    protractor: {
      options: {
        configFile: "protractor.config.js",
        keepAlive: false,
        noColor: false,
        args: {
          // Arguments passed to the command 
        }
      },
      target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
        all: {}
      },
    },
    run: {
      dev: {
        args: ['server.dev.js', 'tech', 'rich'],
      },
      prod: {
        args: ['server.prod.js', 'yah', 'rich'],
      }
    }
  });


  grunt.registerTask('test:e2e', ['protractor']);
  grunt.registerTask('test:unit', ['mochaTest']);
  grunt.registerTask('dist', [ 'copy:views','copy:styles', 'uglify:dist']);

};


/**
 * Quiz Model
 * @since    3.16.0
 * @version  3.16.8
 */
define( [ 'Collections/Questions', 'Models/Lesson', 'Models/Question', 'Models/_Relationships' ], function( Questions, Lesson, Question, Relationships ) {

	return Backbone.Model.extend( _.defaults( {

		/**
		 * model relationships
		 * @type  {Object}
		 */
		relationships: {
			parent: {
				model: 'lesson',
				type: 'model',
			},
			children: {
				questions: {
					class: 'Questions',
					model: 'llms_question',
					type: 'collection',
				},
			}
		},

		/**
		 * New lesson defaults
		 * @return   obj
		 * @since    3.16.0
		 * @version  3.16.6
		 */
		defaults: function() {

			return {
				id: _.uniqueId( 'temp_' ),
				title: LLMS.l10n.translate( 'New Quiz' ),
				type: 'llms_quiz',
				lesson_id: '',

				status: 'draft',

				// editable fields
				content: '',
				allowed_attempts: 5,
				limit_attempts: 'no',
				limit_time: 'no',
				passing_percent: 65,
				name: '',
				random_answers: 'no',
				time_limit: 30,
				show_correct_answer: 'no',

				questions: [],

				// calculated
				_points: 0,

				// display
				permalink: '',
				_show_settings: false,
			};

		},

		/**
		 * Initializer
		 * @return   void
		 * @since    3.16.0
		 * @version  3.16.3
		 */
		initialize: function() {

			this.startTracking();
			this.init_relationships();

			this.listenTo( this.get( 'questions' ), 'add', this.update_points );
			this.listenTo( this.get( 'questions' ), 'remove', this.update_points );

			this.set( '_points', this.get_total_points() );

			// when a quiz is published, ensure the parent lesson is marked as "Enabled" for quizzing
			this.on( 'change:status', function() {
				if ( 'publish' === this.get( 'status' ) ) {
					this.get_parent().set( 'quiz_enabled', 'yes' );
				}
			} );

		},

		/**
		 * Add a new question to the quiz
		 * @param    obj   data   question data
		 * @return   void
		 * @since    3.16.0
		 * @version  3.16.0
		 */
		add_question: function( data ) {

			data.parent_id = this.get( 'id' );
			var question = this.get( 'questions' ).add( data, {
				parent: this,
			} );
			Backbone.pubSub.trigger( 'quiz-add-question', question, this );

		},

		/**
		 * Retrieve the quiz's total points
		 * @return   int
		 * @since    3.16.0
		 * @version  3.16.0
		 */
		get_total_points: function() {

			var points = 0;

			this.get( 'questions' ).each( function( question ) {
				points += question.get_points();
			} );

			return points;

		},

		/**
		 * Update total number of points calculated property
		 * @return   int
		 * @since    3.16.0
		 * @version  3.16.0
		 */
		update_points: function() {

			this.set( '_points', this.get_total_points() );

		},

	}, Relationships ) );

} );

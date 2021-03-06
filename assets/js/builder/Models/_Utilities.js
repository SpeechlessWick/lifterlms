define( [], function() {

	return {

		/**
		 * Retrieve the edit post link for the current model
		 * @return   string
		 * @since    3.16.0
		 * @version  3.16.0
		 */
		get_edit_post_link: function() {

			if ( this.has_temp_id() ) {
				return '';
			}

			return window.llms_builder.admin_url + 'post.php?post=' + this.get( 'id' ) + '&action=edit';

		},

		/**
		 * Determine if the model has a temporary ID
		 * @return   {Boolean}
		 * @since    3.16.0
		 * @version  3.16.0
		 */
		has_temp_id: function() {

			return ( ! _.isNumber( this.get( 'id' ) ) && 0 === this.get( 'id' ).indexOf( 'temp_' ) );

		}

	};

} );

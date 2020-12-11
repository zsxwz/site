jQuery( function ( $ ) {

    webpoint_initialize();

    function webpoint_initialize() {

        /* Get ajax nonce */
        webpoint_ajax_nonce_init();

        /* Window resize event */
        webpoint_window_resize_end_event();

        /* Window resize custom event */
        webpoint_window_resize_custom_event();

        /* Click on an element with data-href attribute */
        webpoint_data_href_click();

        /* Menu li:hover callback */
        webpoint_menu_li_hover();

        /* Init mobile nested menus */
        webpoint_nested_menus( '#main-menu ul.menu' );
        webpoint_nested_menus( '#sidebar ul.menu' );

        /* Init header top menu */
        var top_menu = $( '#top-menu' );
        if ( top_menu.length ) {
            webpoint_responsive_menu( top_menu );
            webpoint_fix_dropdown_menu( top_menu );
        }

        /* Init header main menu */
        var main_menu = $( '#main-menu' );
        if ( main_menu.length ) {
            webpoint_responsive_menu( main_menu );
            webpoint_fix_dropdown_menu( main_menu );
        }

        /* Init user menu */
        var user_menu = $( '#user-menu' );
        if ( user_menu.length ) {
            webpoint_fix_dropdown_menu( '#user-menu' );
        }

        /* Init mobile menu */
        webpoint_mobile_nav();

        /* Entry header meta float fix */
        webpoint_entry_header_meta_float_fix();

        /* Init tabs */
        webpoint_tabs_init();

        /* Gallery show all button */
        webpoint_gallery_show_all();

        /* Read more link for archive description */
        // webpoint_archive_description_read_more();

        /* Fluid width video */
        webpoint_fluid_width_video();

        /* Count characters in textarea */
        webpoint_text_input_char_count( '#respond textarea' );

        /* Init sticky widgets */
        webpoint_fixed_widget( '#sidebar' );

        /* Init sidebar widgets */
        webpoint_sidebar_widgets();

        /* Comments Init */
        webpoint_comments();

        /* Run after page load */
        $( window ).on( 'load', function() {

            /* Scroll to hash */
            webpoint_scroll_to_hash( 1000 );

            /* Window resize event */
            jQuery( window ).trigger( 'webpoint_resizeend' );

        } );

    } // webpoint_initialize();

} ); /* Document Ready */


if ( typeof webpoint_get_globals !== 'function' ) {

    function webpoint_get_globals( key ) {

        /* Check global var exists */
        if ( typeof webpoint === 'undefined' || jQuery.type( webpoint ) !== 'object' ) {
            return false;
        }

        /* Check key data type */
        if ( typeof key === 'undefined' || jQuery.type( key ) !== 'string' ) {
            return false;
        }

        /* Return object property */
        return jQuery.type( webpoint[ key ] ) !== 'undefined' ? webpoint[ key ] : false;

    } // webpoint_get_globals();

}


if ( typeof webpoint_set_globals !== 'function' ) {

    function webpoint_set_globals( key, value ) {

        /* Check global var exists */
        if ( typeof webpoint === 'undefined' || jQuery.type( webpoint ) !== 'object' ) {
            return false;
        }

        /* Check key data type */
        if ( typeof key === 'undefined' || jQuery.type( key ) !== 'string' ) {
            return false;
        }

        /* Set object property */
        webpoint[ key ] = value;

        /* Return status */
        return true;

    } // webpoint_set_globals();

}


if ( typeof webpoint_get_ajax_nonce !== 'function' ) {

    function webpoint_get_ajax_nonce() {

        /* Get global ajax nonce */
        var ajax_nonce = webpoint_get_globals( 'webpoint_ajax_nonce' );

        /* Return value if global var exists */
        if ( ajax_nonce !== false ) {
            return ajax_nonce;
        }

        /* Get ajax nonce */
        jQuery.ajax( {
            async: false,
            type: 'POST',
            url: webpoint_get_globals( 'ajax_url' ),
            data: {
                'action' : 'webpoint_ajax_nonce'
            },
            dataType: 'html'
        } ).done( function( data ) {
            ajax_nonce = data;
        } );

        /* Check ajax nonce */
        ajax_nonce = jQuery.type( ajax_nonce ) === 'string' ? jQuery.trim( ajax_nonce ) : false;
        ajax_nonce = ajax_nonce && ajax_nonce !== '0' && ajax_nonce !== '-1' ? ajax_nonce : false;

        /* Set global var */
        if ( ajax_nonce !== false ) {
            webpoint_set_globals( 'webpoint_ajax_nonce', ajax_nonce );
        }

        /* Return ajax nonce */
        return ajax_nonce;

    } // webpoint_get_ajax_nonce();

}


if ( typeof webpoint_ajax_nonce_init !== 'function' ) {

    function webpoint_ajax_nonce_init() {

        /* Get ajax nonce */
        jQuery.ajax( {
            type: 'POST',
            url: webpoint_get_globals( 'ajax_url' ),
            data: {
                'action' : 'webpoint_ajax_nonce'
            },
            dataType: 'html'
        } ).done( function( nonce ) {

            /* Check ajax nonce */
            nonce = jQuery.type( nonce ) === 'string' ? jQuery.trim( nonce ) : false;
            nonce = nonce && nonce !== '0' && nonce !== '-1' ? nonce : false;

            /* Set global var */
            if ( nonce !== false ) {
                webpoint_set_globals( 'webpoint_ajax_nonce', nonce );
                jQuery( window ).trigger( 'webpoint_ajax_nonce_init' );
            }

        } );

    } // webpoint_ajax_nonce_init();

}


if ( typeof webpoint_globals_init !== 'function' ) {

    function webpoint_globals_init() {

        /* Init ajax nonce */
        webpoint_ajax_nonce_init();

        /* Set js globals after ajax nonce init */
        jQuery( window ).on( 'webpoint_ajax_nonce_init', function() {

            jQuery.ajax( {
                type: 'POST',
                url: webpoint_get_globals( 'ajax_url' ),
                data: {
                    'action' : 'webpoint_js_globals_init',
                    'webpoint_ajax_nonce' : webpoint_get_ajax_nonce()
                },
                dataType: 'html'
            } ).done( function( data ) {
                data = jQuery.parseJSON( data );
                if ( jQuery.type( webpoint ) === 'object' && jQuery.type( data ) === 'object' ) {
                    jQuery.extend( webpoint, data );
                    jQuery( window ).trigger( 'webpoint_globals_init' );
                }
            } );

        } );

    } // webpoint_globals_init();

}


if ( typeof webpoint_get_translation !== 'function' ) {

    function webpoint_get_translation( text ) {

        /* Check global var exists */
        if ( typeof webpoint_i18n === 'undefined' || jQuery.type( webpoint_i18n ) !== 'object' ) {
            return false;
        }

        /* Check key data type */
        if ( typeof text === 'undefined' || jQuery.type( text ) !== 'string' ) {
            return false;
        }

        /* Return object property */
        return jQuery.type( webpoint_i18n[ text ] ) !== 'undefined' ? webpoint_i18n[ text ] : text;

    } // webpoint_get_translation();

}


if ( typeof webpoint_window_resize_end_event !== 'function' ) {

    function webpoint_window_resize_end_event() {

        var rtime;
        var timeout = false;
        var delta = 200;

        jQuery( window ).on( 'resize orientationchange', function() {
            rtime = new Date();
            if ( timeout === false ) {
                timeout = true;
                setTimeout( webpoint_resizeend, delta );
            }
        } );

        function webpoint_resizeend() {
            if ( new Date() - rtime < delta ) {
                setTimeout( webpoint_resizeend, delta );
            } else {
                timeout = false;
                /* Done resizing */
                jQuery( window ).trigger( 'webpoint_resizeend' );
            }
        } // webpoint_resizeend();

    } // webpoint_window_resize_end_event();

}


if ( typeof webpoint_resize_element !== 'function' ) {

    function webpoint_resize_element( element, callback ) {

        /* Check input data */
        if ( typeof element === 'undefined' || typeof callback === 'undefined' ) {
            return false;
        }

        /* Get element */
        if ( jQuery.type( element ) === 'string' ) {
            element = jQuery( element ).first();
        } else if ( jQuery.type( element ) !== 'object' ) {
            element = false;
        }

        /* Check element */
        if ( ! element || ! element.length ) {
            return false;
        }

        var last_width = parseInt( element.outerWidth( true ) );
        var last_height = parseInt( element.outerHeight( true ) );
        var new_width, new_height;

        ( function webpoint_check_size() {

            new_width = parseInt( element.outerWidth( true ) );
            new_height = parseInt( element.outerHeight( true ) );

            if ( last_width !== new_width || last_height !== new_height ) {
                if ( jQuery.type( callback ) === 'function' ) {
                    callback();
                }
            }

            last_width = new_width;
            last_height = new_height;

            if ( element.resizeTimer ) {
                clearTimeout( element.resizeTimer );
            }

            element.resizeTimer = setTimeout( webpoint_check_size, 200 );

        } )();

    } // webpoint_resize_element();

}


if ( typeof webpoint_window_resize_custom_event !== 'function' ) {

    function webpoint_window_resize_custom_event() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_window_resize_custom_event' ) === '0' ) {
            return;
        }

        webpoint_resize_element( '#main', function() {
            jQuery( window ).trigger( 'webpoint_update_fixed_widget' );
        } );

    } // webpoint_window_resize_custom_event();

}


if ( typeof webpoint_is_mobile !== 'function' ) {

    function webpoint_is_mobile() {

        /* Get viewport width */
        var viewport_width = jQuery( window ).width();

        /* Get viewport height */
        var viewport_height = jQuery( window ).height();

        /* Return device type based on viewport size */
        return viewport_width <= 800 || viewport_height <= 480;

    } // webpoint_is_mobile();

}


if ( typeof webpoint_get_random_bool !== 'function' ) {

    function webpoint_get_random_bool() {

        /* Return random boolean */
        return Math.random() >= 0.5;

    } // webpoint_get_random_bool();

}


if ( typeof webpoint_get_random_int !== 'function' ) {

    function webpoint_get_random_int( min, max ) {

        /* Check min */
        if ( typeof min === 'undefined' || min !== parseInt( min, 10 ) ) {
            return 0;
        }

        /* Check max */
        if ( typeof max === 'undefined' || max !== parseInt( max, 10 ) ) {
            return 0;
        }

        /* Compare values */
        if ( min > max ) {
            return 0;
        }

        /* Return random number */
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;


    } // webpoint_get_random_int();

}


if ( typeof webpoint_is_empty !== 'function' ) {

    function webpoint_is_empty( el ) {
        return ! jQuery.trim( el.html() );
    } // webpoint_is_empty();

}


if ( typeof webpoint_child_elements_float_fix !== 'function' ) {

    function webpoint_child_elements_float_fix( parent ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_child_elements_float_fix' ) === '0' ) {
            return;
        }

        /* Check required var exists */
        if ( typeof parent === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( parent ) === 'string' ) {
            parent = jQuery( parent );
        } else if ( jQuery.type( parent ) !== 'object' ) {
            return;
        }

        /* Check element */
        if ( ! parent || ! parent.length ) {
            return;
        }

        /* Get margin */
        var margin = parseFloat( jQuery( 'html' ).css( 'font-size' ) );
        if ( isNaN( margin ) ) {
            margin = 16;
        }

        function webpoint_child_elements_float_fix_cb() {

            var width, max_width;

            parent.each( function() {

                width = jQuery( this ).width();
                max_width = margin;

                /* Get the first level child elements */
                var first_level_clilds = jQuery( this ).find( '> *' );
                if ( ! first_level_clilds.length || first_level_clilds.length === 1 ) {
                    return true;
                }

                /* Loop through the first level child elements */
                first_level_clilds.each( function() {

                    jQuery( this ).css( { 'display': 'inline-block' } );

                    max_width += jQuery( this ).outerWidth( true );

                } );

                if ( width > max_width ) {

                    first_level_clilds.filter( ':not(:last)' ).css( {
                        'display': '',
                        'float': 'left'
                    } );

                    first_level_clilds.filter( ':last' ).css( {
                        'display': '',
                        'float': 'right'
                    } );

                } else {

                    first_level_clilds.removeAttr( 'style' );

                }

            } );
            
        } // webpoint_child_elements_float_fix_cb();

        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_child_elements_float_fix_cb();
        } );

        /* Fix float after page load */
        webpoint_child_elements_float_fix_cb();

    } // webpoint_child_elements_float_fix();

}


if ( typeof webpoint_entry_header_meta_float_fix !== 'function' ) {

    function webpoint_entry_header_meta_float_fix() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_entry_header_meta_float_fix' ) === '0' ) {
            return;
        }

        /* Check page type */
        var page_type = webpoint_get_globals( 'page_type' );
        if ( page_type !== 'single' && page_type !== 'attachment' && page_type !== 'page' ) {
            return;
        }

        /* Get entry header meta */
        var entry_header_meta = jQuery( '#main' ).find( '> article.hentry > .wrap > .entry-header > .entry-meta' );

        /* Run callback function */
        webpoint_child_elements_float_fix( entry_header_meta );

    } // webpoint_entry_header_meta_float_fix();

}


if ( typeof webpoint_data_href_click !== 'function' ) {

    function webpoint_data_href_click() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_data_href_click' ) === '0' ) {
            return;
        }

        jQuery( document ).on( 'click', '[data-href]', function( e ) {
            var href = jQuery( this ).data( 'href' );
            if ( jQuery.type( href ) === 'string' && href.length ) {
                /* CTRL + click or data-target="_blank" */
                if ( e.ctrlKey || jQuery( this ).data( 'target' ) === '_blank' ) {
                    window.open( href );
                    return false;
                } else {
                    window.location.href = href;
                    return false;
                }
            }
        } ).on( 'mousedown', '[data-href]', function( e ) {
            var href = jQuery( this ).data( 'href' );
            if ( jQuery.type( href ) === 'string' && href.length ) {
                /* Middle button click */
                if ( e.which === 2 ) {
                    window.open( href );
                    return false;
                }
            }
        } );

    } // webpoint_data_href_click();

}


if ( typeof webpoint_fluid_width_video !== 'function' ) {

    function webpoint_fluid_width_video() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_fluid_width_video' ) === '0' ) {
            return;
        }

        var content = jQuery( '#main' );
        var $allVideos = content.find( 'iframe[src^="http://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src^="https://www.youtube.com"], object, embed' );
        var $fluidEl = content.find( '.entry-content' );

        $allVideos.each( function() {
            jQuery( this )
            // jQuery .data does not work on object/embed elements
                .attr( 'data-aspectRatio', this.height / this.width )
                .removeAttr( 'height' )
                .removeAttr( 'width' );
        } );

        jQuery( window ).on( 'webpoint_resizeend', function() {
            var newWidth = $fluidEl.width();
            $allVideos.each( function() {
                var $el = jQuery( this );
                $el
                    .width( newWidth )
                    .height( newWidth * $el.attr( 'data-aspectRatio' ) );
            } );
        } );

    } // webpoint_fluid_width_video();

}


if ( typeof webpoint_text_input_char_count !== 'function' ) {

    function webpoint_text_input_char_count( textarea ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_text_input_char_count' ) === '0' ) {
            return;
        }

        /* Check required var exists */
        if ( typeof textarea === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( textarea ) === 'string' ) {
            textarea = jQuery( textarea ).first();
        } else if ( jQuery.type( textarea ) !== 'object' ) {
            textarea = false;
        }

        /* Check element */
        if ( ! textarea || ! textarea.length ) {
            return;
        }

        /* Loop through each element */
        textarea.each( function() {

            var readonly = jQuery( this ).attr( 'readonly' );
            if ( readonly === 'readonly' ) {
                return;
            }

            var count = jQuery( this ).val().length;
            var maxlength = jQuery( this ).attr( 'maxlength' );

            if ( maxlength && maxlength.length > 0 ) {

                jQuery( this ).before( '<span class="counter">' + count + ' ' + webpoint_get_translation( 'out of' ) + ' ' + maxlength + '</span>' );

                if ( count < maxlength ) {

                    jQuery( this ).siblings( 'span.counter' ).css( {
                        'color': '#808080'
                    } );

                } else {

                    jQuery( this ).siblings( 'span.counter' ).css( {
                        'color': '#cc0000'
                    } );

                }

                jQuery( this ).on( 'change keyup', function() {

                    count = jQuery( this ).val().length;

                    jQuery( this ).siblings( 'span.counter' ).html( count + ' ' + webpoint_get_translation( 'out of' ) + ' ' + maxlength );

                    if ( count < maxlength ) {

                        jQuery( this ).siblings( 'span.counter' ).css( {
                            'color': '#808080'
                        } );

                    } else {

                        jQuery( this ).siblings( 'span.counter' ).css( {
                            'color': '#cc0000'
                        } );

                    }

                } );

            }

        } );

    } // webpoint_text_input_char_count();

}


if ( typeof webpoint_comments !== 'function' ) {

    function webpoint_comments() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_comments' ) === '0' ) {
            return;
        }

        /* Check page type */
        var page_type = webpoint_get_globals( 'page_type' );
        if ( page_type !== 'single' && page_type !== 'page' && page_type !== 'attachment' ) {
            return;
        }

        /* Get comments container */
        var comments = jQuery( '#comments' );
        if ( ! comments.length ) {
            return;
        }

        /* Get comment form */
        var comment_form = comments.find( '#respond' );

        /* Get comment form title */
        var comment_form_title = comment_form.find( '#reply-title' );

        /* Get comment field */
        var comment = comments.find( '#comment' );

        /* Create cancel reply button */
        var cancel_reply = jQuery( '<div/>' ).html( '<div class="cancel-wrap"><span id="cancel-reply"><i class="fa fa-times"></i> ' + webpoint_get_translation( 'Cancel reply' ) + '</span></div><!-- .cancel-wrap -->' ).contents();

        /* Insert cancel reply button */
        comment_form_title.after( cancel_reply );

        /* Get comment parent input */
        var comment_parent_input = comment_form.find( 'input[name="comment_parent"]' );
        
        /* Reset comment parent */
        comment_parent_input.val( '' );

        /* Click on reply link */
        comments.on( 'click', '.reply', function() {

            /* Get current comment */
            var comment = jQuery( this ).closest( '.separate-comment' );

            /* Set comment parent ID */
            comment_parent_input.val( jQuery( this ).data( 'comment-id' ) );

            /* Show cancel reply button */
            cancel_reply.show();
            
            /* Move comment form to current comment */
            comment_form.appendTo( comment );

            /* Focus on comment field */
            comment.focus();

        } );

        /* Click on cancel reply link */
        comments.on( 'click', '#cancel-reply', function() {

            /* Reset comment parent ID */
            comment_parent_input.val( '' );

            /* Hide cancel reply button */
            cancel_reply.hide();

            /* Move the comment form back to the end of the comment list */
            comment_form.appendTo( comments );

        } );

        /* Add separator between comment footer items */
        comments
            .find( '.comment-footer > *:not(:last-child)' )
            .after( ' <span class="sep">|</span> ' );

        /* Get comment header */
        var comment_header = comments.find( '#comment-list .separate-comment .comment-header' );

        /* Run callback function */
        webpoint_child_elements_float_fix( comment_header );

    } // webpoint_comments();

}


if ( typeof webpoint_scroll_to_hash !== 'function' ) {

    function webpoint_scroll_to_hash( duration ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_scroll_to_hash' ) === '0' ) {
            return;
        }

        duration = typeof duration === 'number' ? duration : 0;
        var hash = window.location.hash;
        var element = jQuery( hash );

        if ( hash && element.length && element.is( ':visible' ) ) {
            if ( duration === 0 ) {
                jQuery( window ).scrollTop( jQuery( hash ).offset().top );
            } else {
                jQuery( 'html, body' ).animate( {
                    scrollTop: jQuery( hash ).offset().top
                }, duration );
            }
        }

    } // webpoint_scroll_to_hash();

}


if ( typeof webpoint_in_sight !== 'function' ) {

    function webpoint_in_sight( elem, position ) {

        var $elem, $position;

        if ( typeof elem === 'undefined' ) {
            return false;
        }

        if ( jQuery.type( elem ) === 'string' ) {
            $elem = jQuery( elem );
        } else if ( jQuery.type( elem ) === 'object' ) {
            $elem = elem;
        } else {
            return false;
        }

        if ( ! $elem.length ) {
            return false;
        }

        if ( typeof position !== 'undefined' && jQuery.type( position ) === 'string' ) {
            $position = position;
        }

        var $window = jQuery( window );

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        if ( $position === 'top' ) {
            return ( elemTop <= docViewBottom )
        } else if ( $position === 'bottom' ) {
            return ( elemBottom <= docViewBottom )
        } else {
            return ( ( elemBottom <= docViewBottom ) && ( elemTop >= docViewTop ) );
        }

    } // webpoint_in_sight();

}


if ( typeof webpoint_sidebar_widgets !== 'function' ) {

    function webpoint_sidebar_widgets() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_sidebar_widgets' ) === '0' ) {
            return;
        }

        /* Get sidebar widgets */
        var widgets = jQuery( '#content' ).find( '.sidebar .widget' );

        /* Widget title click event */
        widgets.on( 'click', '.widget-title', function() {

            /* Check parent element */
            if ( ! jQuery( this ).parent().hasClass( 'widget' ) ) {
                return;
            }

            /* Get widget */
            var widget = jQuery( this ).closest( '.widget' );

            /* Expand/collapse widget */
            if ( widget.hasClass( 'expand' ) ) {
                widget.removeClass( 'expand' ).addClass( 'collapse' );
            } else if ( widget.hasClass( 'collapse' ) ) {
                widget.removeClass( 'collapse' ).addClass( 'expand' );
            } else {
                widget.addClass( 'collapse' );
            }

            /* Update fixed widget */
            jQuery( window ).trigger( 'webpoint_update_fixed_widget' );

        } );

    } // webpoint_sidebar_widgets();

}


if ( typeof webpoint_nested_menus !== 'function' ) {

    function webpoint_nested_menus( menu ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_nested_menus' ) === '0' ) {
            return;
        }

        /* Check required var exists */
        if ( typeof menu === 'undefined' ) {
            return;
        }

        /* Get the menu */
        menu = jQuery( menu );

        /* Check the menu */
        if ( ! menu.length ) {
            return;
        }

        /* Loop through each element */
        menu.each( function() {

            /* Check menu */
            if ( menu.prop( 'tagName' ).toLowerCase() !== 'ul' || ! menu.hasClass( 'menu' ) ) {
                return true;
            }

            /* Add expand items to nested menus */
            jQuery( this ).find( 'li.menu-item-has-children' ).each( function() {

                /* Get sub menu */
                var sub_menu = jQuery( this ).find( 'ul.sub-menu' );

                /* Check sub menu */
                if ( sub_menu.length ) {

                    /* Add expand item */
                    jQuery( this )
                        .addClass( 'js' )
                        .find( '> a, > .item' )
                        .append( '<span class="fa expand"></span>' );

                } else {

                    /* Remove css class */
                    jQuery( this ).removeClass( 'menu-item-has-children' );

                }

            } );

        } );

        /* Change list item class after click on a link */
        menu.on( 'click', 'li.menu-item-has-children > a', function( e ) {
            if ( e.target.className.toLowerCase().indexOf( 'item-text' ) < 0 ) {

                /* Prevent event */
                e.preventDefault();

                /* Get elements */
                var li = jQuery( this ).closest( 'li.menu-item-has-children' );
                var sub_menu = li.find( '> ul.sub-menu' );

                /* Update class */
                if ( li.hasClass( 'active' ) ) {
                    li.removeClass( 'active' ).addClass( 'inactive' );
                } else if ( li.hasClass( 'inactive' ) ) {
                    li.removeClass( 'inactive' ).addClass( 'active' );
                } else if ( sub_menu.is( ':visible' ) ) {
                    li.addClass( 'inactive' );
                } else {
                    li.addClass( 'active' );
                }

                /* Update fixed widget */
                jQuery( window ).trigger( 'webpoint_update_fixed_widget' );

            }
        } );

        /* Change list item class after click on an element with class .item */
        menu.on( 'click', 'li.menu-item-has-children > .item', function() {

            /* Get elements */
            var li = jQuery( this ).closest( 'li.menu-item-has-children' );
            var sub_menu = li.find( '> ul.sub-menu' );

            /* Update class */
            if ( li.hasClass( 'active' ) ) {
                li.removeClass( 'active' ).addClass( 'inactive' );
            } else if ( li.hasClass( 'inactive' ) ) {
                li.removeClass( 'inactive' ).addClass( 'active' );
            } else if ( sub_menu.is( ':visible' ) ) {
                li.addClass( 'inactive' );
            } else {
                li.addClass( 'active' );
            }

            /* Update fixed widget */
            jQuery( window ).trigger( 'webpoint_update_fixed_widget' );

        } );

    } // webpoint_nested_menus();

}


if ( typeof webpoint_mobile_nav !== 'function' ) {

    function webpoint_mobile_nav() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_mobile_nav' ) === '0' ) {
            return;
        }

        /* Get main menu container */
        var main_menu = jQuery( '#main-menu' );

        /* Set main menu status */
        var main_menu_exists = main_menu.length;

        /* Get main search */
        var main_search = jQuery( '#main-search' );

        /* Get main search status */
        var main_search_exists = main_search.length;

        /* Get mobile sidebar menu status */
        var mobile_sidebar_menus = webpoint_get_globals( 'mobile_sidebar_menus' ) === '1'
            ? jQuery( '#sidebar' ).find( '.widget ul[id^="menu-"]' ).length
            : false;

        /* Check required vars */
        if ( ! main_menu_exists && ! mobile_sidebar_menus && ! main_search_exists ) {
            return;
        }

        /* Set mobile nav */
        var mobile_nav = '';

        /* Set mobile nav css class */
        $mobile_nav_class = 'clearfix';

        /* Update mobile nav css class */
        if ( ( ! main_menu_exists && ! mobile_sidebar_menus ) || ! main_search_exists ) {
            $mobile_nav_class += ' btns-2';
        }

        /* Add opening divs for the mobile nav */
        mobile_nav += '<div class="mobile-row">' +
            '<div class="sw">' +
            '<div class="inner clearfix">' +
            '<div id="mobile-nav" class="' + $mobile_nav_class + '">';

        /* Add menu button */
        if ( main_menu_exists || mobile_sidebar_menus ) {
            mobile_nav += '<a id="show-mobile-menu" href="#"><i class="fa fa-bars"></i></a>';
        }

        /* Add home page button */
        mobile_nav += '<a id="show-homepage" href="/"><i class="fa fa-home"></i></a>';

        /* Add main search button */
        if ( main_search_exists ) {
            mobile_nav += '<a id="show-mobile-search" href="#"><i class="fa fa-search"></i></a>';
        }

        /* Add closing divs for the mobile nav */
        mobile_nav += '</div><!-- #mobile-nav -->' +
            '</div><!-- .inner -->' +
            '</div><!-- .sw -->' +
            '</div><!-- .mobile-row -->';

        /* Create mobile nav with wrapper */
        jQuery( '<div/>' ).html( mobile_nav ).contents().appendTo( '#header' );

        /* Get mobile nav */
        mobile_nav = jQuery( '#mobile-nav' );
        if ( ! mobile_nav.length ) {
            return;
        }

        /* Create mobile menu and search */
        var mobile_menu = jQuery( '<div/>' ).attr( 'id', 'mobile-menu' );
        var mobile_search = jQuery( '<div/>' ).attr( 'id', 'mobile-search' );

        /* Insert mobile menu and search */
        mobile_search.insertAfter( mobile_nav );
        mobile_menu.insertAfter( mobile_nav );

        /* Get mobile menu */
        mobile_menu = jQuery( '#mobile-menu' );
        if ( ! mobile_menu.length ) {
            return;
        }

        /* Get mobile search */
        mobile_search = jQuery( '#mobile-search' );
        if ( ! mobile_search.length ) {
            return;
        }

        /* Set mobile menu title */
        var mobile_menu_title = webpoint_get_globals( 'mobile_menu_title' );
        if ( mobile_menu_title ) {
            mobile_menu_title = jQuery( '<div/>' )
                .html( '<h2 class="menu-title">' + mobile_menu_title + '</h2>' )
                .contents();
        }

        /* Get main menu content */
        var main_menu_content = main_menu.contents();

        /* Get main search content */
        var main_search_content = main_search.contents();

        /* Init status and position vars */
        var mobile_nav_visible = false;
        var mobile_nav_sticky = false;
        var mobile_nav_top = 0;
        var mobile_menu_top = 0;

        /* Init mobile navigation */
        function webpoint_mobile_nav_init() {

            /* Check if mobile nav is visible */
            if ( mobile_nav.is( ':visible' ) ) {

                /* Check mobile nav visibility status */
                if ( mobile_nav_visible === false ) {

                    /* Insert mobile menu title */
                    if ( mobile_menu_title ) {
                        mobile_menu_title.appendTo( mobile_menu );
                    }

                    /* Move main menu content to mobile menu */
                    if ( main_menu_exists ) {
                        main_menu_content.appendTo( mobile_menu );
                    }

                    /* Move main search content to mobile search */
                    if ( main_search_exists ) {
                        main_search_content.appendTo( mobile_search );
                    }

                    /* Update mobile nav visibility status */
                    mobile_nav_visible = true;

                    /* Check mobile nav sticky status */
                    if ( mobile_nav_sticky ) {

                        /* Reset mobile nav position */
                        webpoint_reset_mobile_nav_position();

                    } else {

                        /* Set mobile nav position */
                        webpoint_get_mobile_nav_position();
                        webpoint_set_mobile_nav_position();

                    }

                    /* Update body class */
                    jQuery( 'body' ).addClass( 'mobile-nav-visible' );

                    /* Create event */
                    jQuery( window ).trigger( 'webpoint_mobile_nav_visible' );

                }

            } else {

                /* Check mobile nav visibility status */
                if ( mobile_nav_visible === true ) {

                    /* Remove main menu title */
                    if ( mobile_menu_title ) {
                        mobile_menu_title.remove();
                    }

                    /* Move main menu content back to the main menu */
                    if ( main_menu_exists ) {
                        main_menu_content.appendTo( main_menu );
                    }

                    /* Move main search content back to the main search */
                    if ( main_search_exists ) {
                        main_search_content.appendTo( main_search );
                    }

                    /* Update mobile nav visibility status */
                    mobile_nav_visible = false;

                    /* Reset mobile nav position */
                    webpoint_reset_mobile_nav_position();

                    /* Update body class */
                    jQuery( 'body' ).removeClass( 'mobile-nav-visible' );

                    /* Create event */
                    jQuery( window ).trigger( 'webpoint_mobile_nav_invisible' );

                }

            }

        } // webpoint_mobile_nav_init();

        function webpoint_get_mobile_nav_position() {

            /* Get the header */
            var header = jQuery( '#header' );

            /* Get header height */
            var top_row_height = header.find( '.top-row' ).outerHeight( true );
            var middle_row_height = header.find( '.middle-row' ).outerHeight( true );
            var header_height = top_row_height + middle_row_height;

            /* Calculate mobile nav top position */
            mobile_nav_top = header.offset().top + header_height;

            /* Calculate mobile menu top position */
            mobile_menu_top = mobile_nav_top + mobile_nav.height();

        } // webpoint_get_mobile_nav_position();

        function webpoint_set_mobile_nav_position() {

            /* Get position */
            var top_position = mobile_menu_top - jQuery( window ).scrollTop();

            /* Set mobile menu position */
            mobile_menu.css( {
                'top': top_position + 'px'
            } );

            /* Set mobile search position */
            mobile_search.css( {
                'top': top_position + 'px'
            } );

        } // webpoint_set_mobile_nav_position();

        function webpoint_reset_mobile_nav_position() {

            /* Reset mobile menu position */
            mobile_menu.css( {
                'top': ''
            } );

            /* Reset mobile search position */
            mobile_search.css( {
                'top': ''
            } );

        } // webpoint_reset_mobile_nav_position();

        function webpoint_fix_mobile_nav_position() {

            /* Check mobile nav visibility var */
            if ( mobile_nav_visible === false ) {
                return;
            }

            /* Check current scroll position */
            if ( jQuery( document ).scrollTop() > mobile_nav_top ) {

                /* Add sticky css class to the body tag and reset mobile nav position */
                if ( mobile_nav_sticky === false ) {
                    jQuery( 'body' ).addClass( 'mobile-nav-sticky' );
                    mobile_nav_sticky = true;
                    webpoint_reset_mobile_nav_position();
                }

            } else {

                /* Remove sticky class from the body tag */
                if ( mobile_nav_sticky === true ) {
                    jQuery( 'body' ).removeClass( 'mobile-nav-sticky' );
                    mobile_nav_sticky = false;
                }

                /* Set nav position */
                webpoint_set_mobile_nav_position();

            }

        } // webpoint_fix_mobile_nav_position();

        /* Reload nav menu on window resize */
        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_mobile_nav_init();
            webpoint_fix_mobile_nav_position();
        } );

        /* Update mobile nav position on page scroll */
        jQuery( window ).scroll( function() {
            webpoint_fix_mobile_nav_position();
        } );

        /* Ensuring the functionality of the mobile menu buttons. */
        mobile_nav.on( 'click', '#show-mobile-menu', function( e ) {

            /* Prevent click */
            e.preventDefault();

            /* Get the page body */
            var body = jQuery( 'body' );

            /* Hide the mobile search */
            if ( body.hasClass( 'show-mobile-search' ) ) {
                body.removeClass( 'show-mobile-search' );
                mobile_nav
                    .find( '#show-mobile-search' )
                    .find( '.fa-times' )
                    .removeClass( 'fa-times' )
                    .addClass( 'fa-search' );
            }

            /* Show/hide the mobile menu */
            var show_mobile_menu = body.hasClass( 'show-mobile-menu' );
            if ( show_mobile_menu ) {
                body.removeClass( 'show-mobile-menu' );
                mobile_nav
                    .find( '#show-mobile-menu' )
                    .find( '.fa-times' )
                    .removeClass( 'fa-times' )
                    .addClass( 'fa-bars' );
            } else {
                body.addClass( 'show-mobile-menu' );
                mobile_nav
                    .find( '#show-mobile-menu' )
                    .find( '.fa-bars' )
                    .removeClass( 'fa-bars' )
                    .addClass( 'fa-times' );
            }

        } ).on( 'click', '#show-mobile-search', function( e ) {

            /* Prevent click */
            e.preventDefault();

            /* Get the page body */
            var body = jQuery( 'body' );

            /* Hide the mobile menu */
            if ( body.hasClass( 'show-mobile-menu' ) ) {
                body.removeClass( 'show-mobile-menu' );
                mobile_nav
                    .find( '#show-mobile-menu' )
                    .find( '.fa-times' )
                    .removeClass( 'fa-times' )
                    .addClass( 'fa-bars' );
            }

            /* Show/hide the mobile search */
            var show_mobile_search = body.hasClass( 'show-mobile-search' );
            if ( show_mobile_search ) {
                body.removeClass( 'show-mobile-search' );
                mobile_nav
                    .find( '#show-mobile-search' )
                    .find( '.fa-times' )
                    .removeClass( 'fa-times' )
                    .addClass( 'fa-search' );
            } else {
                body.addClass( 'show-mobile-search' );
                mobile_nav
                    .find( '#show-mobile-search' )
                    .find( '.fa-search' )
                    .removeClass( 'fa-search' )
                    .addClass( 'fa-times' );
            }

        } );

        /* Init mobile sidebar menus */
        webpoint_mobile_sidebar_menus();

        /* Init mobile nav */
        webpoint_mobile_nav_init();

    } // webpoint_mobile_nav();

}


if ( typeof webpoint_mobile_sidebar_menus !== 'function' ) {

    function webpoint_mobile_sidebar_menus() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_mobile_sidebar_menus' ) === '0' ) {
            return;
        }

        /* Get the function status */
        if ( webpoint_get_globals( 'mobile_sidebar_menus' ) !== '1' ) {
            return;
        }

        /* Get all sidebar nav menus */
        var sidebar_menus = jQuery( '#sidebar' ).find( '.widget ul[id^="menu-"]' );
        if ( ! sidebar_menus.length ) {
            return;
        }

        /* Get mobile menu */
        var mobile_menu = jQuery( '#mobile-menu' );
        if ( ! mobile_menu.length ) {
            return;
        }

        /* Loop through each menu */
        sidebar_menus.each( function() {

            /* Get required elements */
            var menu = jQuery( this );
            var menu_container = menu.closest( 'div[class$="container"]' );
            var widget = jQuery( this ).closest( '.widget' );
            var menu_title = widget.find( '.widget-title' );

            /* Move sidebar menus to the mobile menu */
            jQuery( window ).on( 'webpoint_mobile_nav_visible', function() {

                /* Move menu title to the mobile menu */
                menu_title
                    .removeClass( 'widget-title' )
                    .addClass( 'menu-title' )
                    .appendTo( mobile_menu );

                /* Move menu to mobile menu */
                menu.appendTo( mobile_menu );

                /* Hide empty widget element */
                widget.addClass( 'hidden' );

            } );

            /* Move menus back to the site sidebar */
            jQuery( window ).on( 'webpoint_mobile_nav_invisible', function() {

                /* Move menu title back to the widget */
                menu_title
                    .removeClass( 'menu-title' )
                    .addClass( 'widget-title' )
                    .prependTo( widget );

                /* Move menu back to the widget */
                menu.appendTo( menu_container );

                /* Show sidebar widget menu */
                widget.removeClass( 'hidden' );

            } );

        } );

    } // webpoint_mobile_sidebar_menus();

}


if ( typeof webpoint_tabs_init !== 'function' ) {

    function webpoint_tabs_init() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_tabs_init' ) === '0' ) {
            return;
        }

        /* Get tabs */
        var tabs = jQuery( '.tabs' );

        /* Check tabs */
        if ( ! tabs.length ) {
            return;
        }

        jQuery( 'body' )
        /* Tabs init event */
            .on( 'webpoint_tabs_init', '.tabs', function() {
                /* Get hash and url */
                var hash = window.location.hash;

                /* Get tabs nav */
                var tabs_nav = jQuery( this ).find( '.tabs-nav' ).first();

                /* Check tabs nav */
                if ( ! tabs_nav.length ) {
                    return;
                }

                /* Activate the tab */
                if ( hash && tabs_nav.find( 'a[href="' + hash + '"]' ).length ) {
                    tabs_nav.find( 'a[href="' + hash + '"]' ).click();
                } else {
                    var first_item = tabs_nav.find( 'li:first a' );
                    var first_item_href = first_item.attr( 'href' );

                    /* Check hash symbol at start of href */
                    if ( first_item_href.indexOf( '#' ) === 0 ) {
                        first_item.click();
                    }
                }

                /* Responsive tabs */
                webpoint_responsive_tabs( jQuery( this ) );

            } )
            /* Tabs click event */
            .on( 'click', '.tabs .tabs-nav li a', function( e ) {
                /* Prevent the transition by reference */
                e.preventDefault();

                /* Get link href */
                var href = jQuery( this ).attr( 'href' );

                /* Check link href */
                if ( jQuery.type( href ) !== 'string' || ! href.length ) {
                    return;
                }

                /* Check hash symbol at start */
                if ( href.indexOf( '#' ) !== 0 ) {
                    window.location.href = href;
                    return;
                }

                /* Check if is more item */
                if ( jQuery( this ).closest( 'li' ).hasClass( 'more' ) ) {
                    return;
                }

                /* Get tabs */
                var tabs = jQuery( this ).closest( '.tabs' );

                /* Get tabs nav */
                var tabs_nav = tabs.find( '.tabs-nav' ).first();

                /* Update tabs link classes */
                tabs_nav.find( 'a' ).removeClass( 'active' );
                jQuery( this ).addClass( 'active' );

                /* Update tabs status class */
                tabs.removeClass( function( index, className ) {
                    return ( className.match( /(^|\s)tabs-active-\S+/g ) || [] ).join( ' ' );
                } ).addClass( 'tabs-active-' + href.substring( 1 ) );

                /* Update tabs panel */
                tabs.find( '.tabs-panel' ).hide();
                tabs.find( href ).show();
            } );

        /* Init tabs */
        tabs.trigger( 'webpoint_tabs_init' );

    } // webpoint_tabs_init();


    /* Tabs Template:

     <div class="tabs">
     <ul class="tabs-nav clearfix">
     <li class="tab-1">
     <a href="#1" class="active">Все о товаре</a>
     </li>

     <li class="tab-2">
     <a href="#2">Описание</a>
     </li>

     <li class="tab-3">
     <a href="#3">Характеристики</a>
     </li>
     </ul>

     <section class="tabs-panel tab-1 clearfix" id="1">
     Tab content 1.
     </section>

     <section class="tabs-panel tab-2 clearfix" id="2">
     Tab content 2.
     </section>

     <section class="tabs-panel tab-3 clearfix" id="3">
     Tab content 3.
     </section>
     </div><!-- .tabs -->
     */

}


if ( typeof webpoint_responsive_tabs !== 'function' ) {

    function webpoint_responsive_tabs( elem ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_responsive_tabs' ) === '0' ) {
            return;
        }

        var tabs;

        /* Check required var exists */
        if ( typeof elem === 'undefined' ) {
            return;
        }

        /* Get tabs */
        if ( jQuery.type( elem ) === 'string' ) {
            tabs = jQuery( elem ).first();
        } else if ( jQuery.type( elem ) === 'object' ) {
            tabs = elem;
        } else {
            tabs = false;
        }

        /* Check tabs */
        if ( ! tabs || ! tabs.length ) {
            return;
        }

        var tabs_vis = tabs.is( ':visible' );
        var tabs_nav = tabs.find( '.tabs-nav' );

        var rem = parseFloat( jQuery( 'html' ).css( 'font-size' ) );
        rem = isNaN( rem ) ? 14 : rem * 0.875;

        tabs_nav.append( jQuery( '<div/>' ).html( '<li class="more" style="display: none;"><a href="#">' + webpoint_get_translation( 'more' ) + '...</a><ul class="sub-menu"></ul></li>' ).contents() );
        
        var more_li = tabs_nav.find( 'li.more' );
        var more_menu = more_li.find( 'ul.sub-menu' );

        var tabs_nav_width = tabs_nav.width() - more_li.outerWidth();

        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_responsive_tabs_cb();
        } );

        tabs.on( 'collapse', function() {
            webpoint_tabs_nav_collapse();
        } );

        tabs.on( 'expand', function() {
            webpoint_tabs_nav_expand();
        } );

        tabs.on( 'reset', function() {
            webpoint_tabs_nav_reset();
        } );

        function webpoint_responsive_tabs_cb() {

            if ( ! tabs.is( ':visible' ) ) {
                return;
            }

            var current_tabs_nav_width = tabs_nav.width() - more_li.outerWidth();

            if ( tabs_vis === false ) {
                webpoint_tabs_nav_collapse();
                tabs_vis = true;
            } else if ( current_tabs_nav_width < tabs_nav_width ) {
                webpoint_tabs_nav_collapse();
            } else if ( current_tabs_nav_width > tabs_nav_width ) {
                webpoint_tabs_nav_expand();
            } else {
                webpoint_tabs_nav_collapse();
            }
            
        } // webpoint_responsive_tabs_cb();

        function webpoint_tabs_nav_collapse() {
            more_menu.css( {
                'display': 'block',
                'visibility': 'hidden'
            } );

            tabs_nav_width = tabs_nav.width() - more_li.outerWidth();
            var tabs_nav_li_width = rem;
            var tabs_nav_li = tabs_nav.children( 'li' ).not( '.more' );

            tabs_nav_li.each( function( i ) {
                tabs_nav_li_width += jQuery( this ).outerWidth();
                if ( tabs_nav_li_width > tabs_nav_width ) {
                    if ( tabs_nav_li.length > 1 ) {
                        if ( i > 0 ) {
                            jQuery( this ).prev( 'li' ).nextAll( 'li' ).not( '.more' )
                                .detach()
                                .css( 'opacity', 0 )
                                .prependTo( more_menu )
                                .stop()
                                .animate( {
                                    'opacity': 1
                                }, 300 )
                                .removeAttr( 'style' );
                        } else {
                            jQuery( this ).nextAll( 'li' ).addBack( 'li' ).not( '.more' )
                                .detach()
                                .css( 'opacity', 0 )
                                .prependTo( more_menu )
                                .stop()
                                .animate( {
                                    'opacity': 1
                                }, 300 )
                                .removeAttr( 'style' );
                        }
                    } else {
                        jQuery( this )
                            .detach()
                            .css( 'opacity', 0 )
                            .prependTo( more_menu )
                            .stop()
                            .animate( {
                                'opacity': 1
                            }, 300 )
                            .removeAttr( 'style' );
                    }

                    if ( ! tabs_nav.children( 'li' ).not( '.more' ).length ) {
                        more_li.find( '> a' ).html( '<i class="fa fa-bars"></i>' );
                    }

                    more_li.css( {
                        'display': 'block'
                    } );

                    return false;
                }
            } );

            more_menu.removeAttr( 'style' );
        } // webpoint_tabs_nav_collapse();

        function webpoint_tabs_nav_expand() {
            more_menu.css( {
                'display': 'block',
                'visibility': 'hidden'
            } );

            tabs_nav_width = tabs_nav.width() - more_li.outerWidth();
            var tabs_nav_li_width = rem;
            var tabs_nav_li = tabs_nav.children( 'li' ).not( '.more' );

            tabs_nav_li.each( function() {
                tabs_nav_li_width += jQuery( this ).outerWidth();
            } );

            more_menu.children( 'li' ).each( function() {
                tabs_nav_li_width += jQuery( this ).outerWidth();
                if ( tabs_nav_li_width < tabs_nav_width ) {
                    jQuery( this )
                        .detach()
                        .css( 'opacity', 0 )
                        .insertBefore( more_li )
                        .stop()
                        .animate( {
                            'opacity': 1
                        }, 300 )
                        .removeAttr( 'style' );
                } else {
                    return false;
                }
            } );

            if ( tabs_nav.children( 'li' ).not( '.more' ).length > 0 ) {
                more_li.children( 'a' ).text( webpoint_get_translation( 'more' ) + '...' );
            }

            if ( ! more_menu.children( 'li' ).length ) {
                more_li.css( {
                    'display': 'none'
                } );
            }

            more_menu.removeAttr( 'style' );
        } // webpoint_tabs_nav_expand();

        function webpoint_tabs_nav_reset() {
            var more_menu_li = more_menu.children( 'li' );

            if ( ! more_menu_li.length ) {
                return;
            }

            more_menu_li.each( function() {
                jQuery( this )
                    .detach()
                    .css( 'opacity', 0 )
                    .insertBefore( more_li )
                    .stop()
                    .animate( {
                        'opacity': 1
                    }, 300 )
                    .removeAttr( 'style' );
            } );

            more_li.css( {
                'display': 'none'
            } );
        } // webpoint_tabs_nav_reset();

        function webpoint_fix_dropdown_tabs() {
            tabs_nav.on(
                'mouseenter touchend touch tap taphold swipe',
                'li.more',
                function() {
                    var window_width = jQuery( window ).width();
                    var window_scroll_left = jQuery( window ).scrollLeft();

                    var li = jQuery( this );
                    var li_offset = li.offset();
                    var li_offset_left = li_offset.left - window_scroll_left;

                    var menu = li.find( '> .sub-menu' );
                    menu.removeAttr( 'style' );
                    var menu_outer_width = menu.outerWidth();
                    var menu_position = 0;

                    var menu_offset = menu.offset();
                    var menu_offset_left = menu_offset.left - window_scroll_left;
                    var menu_offset_right = window_width - ( menu_offset_left + menu_outer_width );

                    var sw = jQuery( '.sw' );
                    var site_width = sw.width();
                    var site_outer_width = sw.outerWidth();
                    var site_offset = sw.offset();
                    var site_offset_left = site_offset.left - window_scroll_left;
                    var site_offset_right = window_width - ( site_offset_left + site_outer_width );
                    var site_padding = ( site_outer_width - site_width ) / 2;

                    if ( menu_outer_width > site_width ) {
                        menu_position = site_offset_left - li_offset_left + site_padding;
                        menu.css( {
                            'left': menu_position + 'px',
                            'width': site_width + 'px',
                            'white-space': 'normal'
                        } );
                    } else if ( menu_offset_left < ( site_offset_left + site_padding ) ) {
                        menu_position = menu_position + ( site_offset_left - menu_offset_left ) + site_padding;
                        menu.css( {
                            'left': menu_position + 'px'
                        } );
                    } else if ( menu_offset_right < ( site_offset_right + site_padding ) ) {
                        menu_position = menu_position - ( site_offset_right - menu_offset_right ) - site_padding;
                        menu.css( {
                            'left': menu_position + 'px'
                        } );
                    }
                }
            );
        } // webpoint_fix_dropdown_tabs();

        /* Responsive tabs init */
        webpoint_responsive_tabs_cb();

        /* Fix dropdown tabs init */
        webpoint_fix_dropdown_tabs();

    } // webpoint_responsive_tabs();

}


if ( typeof webpoint_gallery_show_all !== 'function' ) {

    function webpoint_gallery_show_all() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_gallery_show_all' ) === '0' ) {
            return;
        }

        jQuery( '#main' ).find( '.gallery' ).each( function() {
            var maxShow = 4;
            if ( jQuery( this ).hasClass( 'gallery-size-thumbnail' ) ) {
                maxShow = 12;
            } else if ( jQuery( this ).hasClass( 'gallery-size-medium' ) ) {
                maxShow = 6;
            } else if ( jQuery( this ).hasClass( 'gallery-size-large' ) ) {
                maxShow = 4;
            } else if ( jQuery( this ).hasClass( 'gallery-size-full' ) ) {
                maxShow = 2;
            }

            var galleryItems = jQuery( this ).find( '.gallery-item' );
            if ( galleryItems.length > maxShow ) {
                var galleryItemsHide = galleryItems.eq( maxShow - 1 ).nextAll();
                galleryItemsHide.hide();
                var hidden = true;
                var showNum = galleryItems.length - maxShow;
                jQuery( this ).append( '<div class="more">' + webpoint_get_translation( 'Show images' ) + ' (<span class="count">+' + showNum + '</span>)</div>' ).find( '.more' ).css( {
                    'border': '0.0625rem solid #E7E7E7',
                    'background-color': '#f9f9f9',
                    'cursor': 'pointer',
                    'margin-top': '0.625rem',
                    'padding': '0.5rem',
                    'text-align': 'center',
                    'color': '#212121'
                } );
                jQuery( this ).on( 'click', '.more', function() {
                    if ( hidden === true ) {
                        jQuery( this ).html( webpoint_get_translation( 'Hide images' ) + ' (<span class="count">-' + showNum + '</span>)' );
                        galleryItemsHide.fadeIn( 350 );
                        hidden = false;
                    } else {
                        jQuery( this ).html( webpoint_get_translation( 'Show images' ) + ' (<span class="count">+' + showNum + '</span>)' );
                        galleryItemsHide.hide();
                        hidden = true;

                        jQuery( 'html, body' ).animate( {
                            scrollTop: jQuery( this ).offset().top
                        }, 1000 );
                    }
                } );
            }
        } );

    } // webpoint_gallery_show_all();

}


if ( typeof webpoint_fixed_widget !== 'function' ) {

    function webpoint_fixed_widget( sidebar ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_fixed_widget' ) === '0' ) {
            return;
        }

        /* Check theme settings */
        if ( webpoint_get_globals( 'fixed_widget' ) !== '1' ) {
            return;
        }

        /* Check required var exists */
        if ( typeof sidebar === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( sidebar ) === 'string' ) {
            sidebar = jQuery( sidebar ).first();
        } else if ( jQuery.type( sidebar ) !== 'object' ) {
            sidebar = false;
        }

        /* Check element */
        if ( ! sidebar || ! sidebar.length ) {
            return;
        }

        /* Get mobile nav */
        var mobile_nav = jQuery( '#mobile-nav' );

        /* Init vars */
        var vars = [];

        /* Init status vars */
        vars['reset'] = false;
        vars['fixed'] = false;
        vars['bottom'] = false;

        /* Set widget CSS */
        function webpoint_fixed_widget_css( css ) {

            /* Check fixed widget exists */
            if ( jQuery.type( vars['widget'] ) !== 'object' ) {
                return;
            }

            /* Updated fixed widget CSS */
            if ( css === 'reset' ) {
                if ( vars['reset'] === false ) {
                    vars['widget'].removeAttr( 'style' );

                    vars['reset'] = true;
                    vars['fixed'] = false;
                    vars['bottom'] = false;
                }
            } else if ( css === 'fixed' ) {
                if ( vars['fixed'] === false ) {
                    vars['widget'].css( {
                        'position': 'fixed',
                        'top': '0',
                        'bottom': '',
                        'width': vars['widget_width'],
                        'z-index': 10
                    } );

                    vars['reset'] = false;
                    vars['fixed'] = true;
                    vars['bottom'] = false;
                }
            } else if ( css === 'bottom' ) {
                if ( vars['bottom'] === false ) {
                    vars['widget'].css( {
                        'position': 'absolute',
                        'top': '',
                        'bottom': 0,
                        'width': vars['widget_width'],
                        'z-index': 10
                    } );

                    vars['reset'] = false;
                    vars['fixed'] = false;
                    vars['bottom'] = true;
                }
            }

        } // webpoint_fixed_widget_css();

        /* Set default vars */
        function webpoint_fixed_widget_set_default_vars() {

            /* Reset widget CSS */
            if ( jQuery.type( vars['widget'] ) === 'object' ) {
                webpoint_fixed_widget_css( 'reset' );
            }

            /* Get last widget */
            vars['widget'] = sidebar.find( '.widget' ).last();

            /* Check last widget exists */
            if ( ! vars['widget'].length ) {
                vars['run'] = false;
                return vars;
            }

            /* Disable fixed widget if mobile nav is visible */
            vars['run'] = ! mobile_nav.is( ':visible' );
            if ( vars['run'] === false ) {
                return vars;
            }

            /* Get content block */
            var content = jQuery( '#main' );

            /* Check content padding */
            if ( content.css( 'padding-left' ) === content.css( 'padding-right' ) ) {
                vars['run'] = false;
                return vars;
            }

            /* Get widget margin top */
            vars['widget_margin_top'] = parseFloat( vars['widget'].css( 'margin-top' ) );
            if ( isNaN( vars['widget_margin_top']) ) {
                vars['widget_margin_top'] = 0;
            }

            /* Get widget top position */
            vars['widget_top'] = vars['widget'].offset().top - vars['widget_margin_top'];

            /* Get site header height */
            vars['header_height'] = jQuery( '#header' ).height();

            /* Get sidebar height */
            vars['sidebar_height'] = sidebar.height();

            /* Get container height */
            vars['container_height'] = sidebar.closest( '.inner' ).height();

            /* Get window height */
            vars['window_height'] = jQuery( window ).height();

            /* Get widget width */
            vars['widget_width'] = vars['widget'].outerWidth();

            /* Get widget height */
            vars['widget_height'] = vars['widget'].outerHeight( true );

            /* Return vars */
            return vars;

        } // webpoint_fixed_widget_set_default_vars();

        /* Set default vars */
        webpoint_fixed_widget_set_default_vars();

        /* Update fixed widget on element resize */
        webpoint_resize_element( sidebar, function() {
            webpoint_fixed_widget_set_default_vars();
            webpoint_fix_fixed_widget_on_scroll();
        } );

        /* Update fixed widget on window resize end */
        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_fixed_widget_set_default_vars();
            webpoint_fix_fixed_widget_on_scroll();
        } );

        /* Update fixed widget on custom event */
        jQuery( window ).on( 'webpoint_update_fixed_widget', function() {
            webpoint_fixed_widget_set_default_vars();
            webpoint_fix_fixed_widget_on_scroll();
        } );

        /* Update fixed widget on scroll */
        jQuery( window ).on( 'scroll', function() {
            webpoint_fix_fixed_widget_on_scroll();
        } );

        /* Update fixed widget CSS on page scroll */
        function webpoint_fix_fixed_widget_on_scroll() {

            /* Check fixed widget exists */
            if ( jQuery.type( vars['widget'] ) !== 'object' ) {
                return;
            }

            /* Reset fixed widget CSS */
            if ( vars['run'] === false
                || vars['window_height'] < vars['widget_height']
                || vars['container_height'] === vars['sidebar_height'] ) {
                webpoint_fixed_widget_css( 'reset' );
                return;
            }

            /* Get window scroll top position */
            var window_scroll_top = jQuery( window ).scrollTop();

            /* Set widget position */
            if ( window_scroll_top < vars['widget_top'] || vars['window_height'] <= vars['widget_height'] ) {
                webpoint_fixed_widget_css( 'reset' );
            } else if ( ( vars['header_height'] + vars['container_height'] ) >= ( window_scroll_top + vars['widget_height'] ) ) {
                webpoint_fixed_widget_css( 'fixed' );
            } else {
                webpoint_fixed_widget_css( 'bottom' );
            }

        } // webpoint_fix_fixed_widget_on_scroll();

    } // webpoint_fixed_widget();

}


if ( typeof webpoint_on_element_height_change !== 'function' ) {

    function webpoint_on_element_height_change( elm, callback ) {

        var lastHeight = elm.clientHeight, newHeight;
        ( function webpoint_element_height_change_run() {
            newHeight = elm.clientHeight;
            if ( lastHeight !== newHeight ) {
                callback();
            }

            lastHeight = newHeight;

            if ( elm.onElementHeightChangeTimer ) {
                clearTimeout( elm.onElementHeightChangeTimer );
            }

            elm.onElementHeightChangeTimer = setTimeout( webpoint_element_height_change_run, 200 );
        } ) ();

    } // webpoint_on_element_height_change();

}


if ( typeof webpoint_menu_li_hover !== 'function' ) {

    function webpoint_menu_li_hover() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_menu_li_hover' ) === '0' ) {
            return;
        }

        jQuery( 'ul.menu' ).on( 'mouseenter', 'li', function() {
            var $this = jQuery( this );
            var timer = $this.data( 'timer' ) || 0;
            clearTimeout( timer );
            $this.addClass( 'hover' );
        } ).on( 'mouseleave', 'li', function() {
            var $this = jQuery( this );
            var timer = $this.data( 'timer' ) || 0;
            clearTimeout( timer );
            timer = setTimeout( function() {
                $this.removeClass( 'hover' );
            }, 250 );
            $this.data( 'timer', timer );
        } );

    } // webpoint_menu_li_hover();

}


if ( typeof webpoint_fix_dropdown_menu !== 'function' ) {

    function webpoint_fix_dropdown_menu( elem ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_fix_dropdown_menu' ) === '0' ) {
            return;
        }

        var wrap;

        /* Check required var exists */
        if ( typeof elem === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( elem ) === 'string' ) {
            wrap = jQuery( elem ).first();
        } else if ( jQuery.type( elem ) === 'object' ) {
            wrap = elem;
        } else {
            wrap = false;
        }

        /* Check element */
        if ( ! wrap || ! wrap.length ) {
            return;
        }

        wrap.on(
            'mouseenter touchend touch tap taphold swipe',
            'ul.menu > li.menu-item-has-children',
            function() {
                var window_width = jQuery( window ).width();
                var window_scroll_left = jQuery( window ).scrollLeft();

                var li = jQuery( this );
                var li_offset = li.offset();
                var li_offset_left = li_offset.left - window_scroll_left;

                var menu = li.find( '> .sub-menu' );
                menu.removeAttr( 'style' );
                var menu_outer_width = menu.outerWidth();
                var menu_position = 0;

                var menu_offset = menu.offset();
                var menu_offset_left = menu_offset.left - window_scroll_left;
                var menu_offset_right = window_width - ( menu_offset_left + menu_outer_width );

                var sw = jQuery( '.sw' );
                var site_width = sw.width();
                var site_outer_width = sw.outerWidth();
                var site_offset = sw.offset();
                var site_offset_left = site_offset.left - window_scroll_left;
                var site_offset_right = window_width - ( site_offset_left + site_outer_width );
                var site_padding = ( site_outer_width - site_width ) / 2;

                if ( menu_outer_width > site_width ) {
                    menu_position = site_offset_left - li_offset_left + site_padding;
                    menu.css( {
                        'left': menu_position + 'px',
                        'width': site_width + 'px',
                        'white-space': 'normal'
                    } );
                } else if ( menu_offset_left < ( site_offset_left + site_padding ) ) {
                    menu_position = menu_position + ( site_offset_left - menu_offset_left ) + site_padding;
                    menu.css( {
                        'left': menu_position + 'px'
                    } );
                } else if ( menu_offset_right < ( site_offset_right + site_padding ) ) {
                    menu_position = menu_position - ( site_offset_right - menu_offset_right ) - site_padding;
                    menu.css( {
                        'left': menu_position + 'px'
                    } );
                }
            }
        );

    } // webpoint_fix_dropdown_menu();

}


if ( typeof webpoint_responsive_menu !== 'function' ) {

    function webpoint_responsive_menu( elem ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_responsive_menu' ) === '0' ) {
            return;
        }

        var wrap;

        /* Check required var exists */
        if ( typeof elem === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( elem ) === 'string' ) {
            wrap = jQuery( elem ).first();
        } else if ( jQuery.type( elem ) === 'object' ) {
            wrap = elem;
        } else {
            wrap = false;
        }

        /* Check element */
        if ( ! wrap || ! wrap.length ) {
            return;
        }

        var wrap_vis = wrap.is( ':visible' );

        var menu = wrap.find( 'ul.menu' );
        var rem = parseFloat( jQuery( 'html' ).css( 'font-size' ) );
        if ( isNaN( rem ) ) {
            rem = 16;
        }

        menu.append( jQuery( '<div/>' ).html( '<li class="menu-item menu-item-has-children more" style="display: none;"><a href="#">' + webpoint_get_translation( 'more' ) + '...</a><ul class="sub-menu"></ul></li>' ).contents() );

        menu.on( 'click', '.more > a', function( e ) {
            e.preventDefault();
        } );

        var more_li = menu.find( 'li.more' );
        var more_menu = more_li.find( 'ul.sub-menu' );

        var wrap_width = wrap.width() - more_li.outerWidth();

        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_responsive_menu_cb();
        } );

        var wrap_id = wrap.attr( 'id' );
        if ( wrap_id === 'main-menu' ) {

            jQuery( window ).on( 'webpoint_mobile_nav_visible', function() {
                webpoint_responsive_menu_reset();
            } );

            jQuery( window ).on( 'webpoint_mobile_nav_invisible', function() {
                webpoint_responsive_menu_collapse();
                webpoint_responsive_menu_expand();
            } );

        }

        var body = jQuery( 'body' );

        function webpoint_responsive_menu_cb() {

            /* Check menu ID and mobile nav status */
            if ( wrap_id === 'main-menu' && body.hasClass( 'mobile-nav-visible' ) ) {
                return;
            }

            if ( ! wrap.is( ':visible' ) ) {
                return;
            }

            var current_wrap_width = wrap.width() - more_li.outerWidth();

            if ( wrap_vis === false ) {
                webpoint_responsive_menu_collapse();
                wrap_vis = true;
            } else if ( current_wrap_width < wrap_width ) {
                webpoint_responsive_menu_collapse();
            } else if ( current_wrap_width > wrap_width ) {
                webpoint_responsive_menu_expand();
            } else {
                webpoint_responsive_menu_collapse();
            }
            
        } // webpoint_responsive_menu_cb();

        function webpoint_responsive_menu_collapse() {
            more_menu.css( {
                'display': 'block',
                'visibility': 'hidden'
            } );

            wrap_width = wrap.width() - more_li.outerWidth();
            var menu_width = rem;
            var menu_li = menu.children( 'li' ).not( '.more' );

            menu_li.each( function( i ) {
                menu_width += jQuery( this ).outerWidth();
                if ( menu_width > wrap_width ) {
                    if ( menu_li.length > 1 ) {
                        if ( i > 0 ) {
                            jQuery( this ).prev( 'li' ).nextAll( 'li' ).not( '.more' )
                                .detach()
                                .css( 'opacity', 0 )
                                .prependTo( more_menu )
                                .stop()
                                .animate( {
                                    'opacity': 1
                                }, 300 )
                                .removeAttr( 'style' );
                        } else {
                            jQuery( this ).nextAll( 'li' ).addBack( 'li' ).not( '.more' )
                                .detach()
                                .css( 'opacity', 0 )
                                .prependTo( more_menu )
                                .stop()
                                .animate( {
                                    'opacity': 1
                                }, 300 )
                                .removeAttr( 'style' );
                        }
                    } else {
                        jQuery( this )
                            .detach()
                            .css( 'opacity', 0 )
                            .prependTo( more_menu )
                            .stop()
                            .animate( {
                                'opacity': 1
                            }, 300 )
                            .removeAttr( 'style' );
                    }

                    if ( ! menu.children( 'li' ).not( '.more' ).length ) {
                        more_li.children( 'a' ).html( '<i class="fa fa-bars"></i>' );
                    }

                    more_li.css( {
                        'display': 'block'
                    } );

                    return false;
                }
            } );

            more_menu.removeAttr( 'style' );
        } // webpoint_responsive_menu_collapse();

        function webpoint_responsive_menu_expand() {
            more_menu.css( {
                'display': 'block',
                'visibility': 'hidden'
            } );

            wrap_width = wrap.width() - more_li.outerWidth();
            var menu_width = rem;
            var menu_li = menu.children( 'li' ).not( '.more' );

            menu_li.each( function() {
                menu_width += jQuery( this ).outerWidth();
            } );
            more_menu.children( 'li' ).each( function() {
                menu_width += jQuery( this ).outerWidth();
                if ( menu_width < wrap_width ) {
                    jQuery( this )
                        .detach()
                        .css( 'opacity', 0 )
                        .insertBefore( more_li )
                        .stop()
                        .animate( {
                            'opacity': 1
                        }, 300 )
                        .removeAttr( 'style' );
                } else {
                    return false;
                }
            } );

            if ( menu.children( 'li' ).not( '.more' ).length > 0 ) {
                more_li.children( 'a' ).text( webpoint_get_translation( 'more' ) + '...' );
            }

            if ( ! more_menu.children( 'li' ).length ) {
                more_li.css( {
                    'display': 'none'
                } );
            }

            more_menu.removeAttr( 'style' );
        } // webpoint_responsive_menu_expand();

        function webpoint_responsive_menu_reset() {
            var more_menu_li = more_menu.children( 'li' );

            if ( ! more_menu_li.length ) {
                return;
            }

            more_menu_li.each( function() {
                jQuery( this )
                    .detach()
                    .css( 'opacity', 0 )
                    .insertBefore( more_li )
                    .stop()
                    .animate( {
                        'opacity': 1
                    }, 300 )
                    .removeAttr( 'style' );
            } );

            more_li.css( {
                'display': 'none'
            } );
        }

        /* Init responsive menu */
        webpoint_responsive_menu_cb();

    } // webpoint_responsive_menu();

}


if ( typeof webpoint_get_url_vars !== 'function' ) {

    /**
     * Convert URL to Object
     */
    function webpoint_get_url_vars( url ) {

        if ( typeof url === 'undefined' || jQuery.type( url ) !== 'string' ) {
            url = '';
        }

        var hash;
        var myJson = {};
        var hashes = url.slice( url.indexOf( '?' ) + 1 ).split( '&' );
        for ( var i = 0; i < hashes.length; i++ ) {
            hash = hashes[i].split( '=' );
            myJson[ hash[0] ] = hash[1];
        }

        return myJson;

    } // webpoint_get_url_vars();

}


if ( typeof webpoint_read_more_toggle !== 'function' ) {

    function webpoint_read_more_toggle( elem, height, more_text, less_text ) {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_read_more_toggle' ) === '0' ) {
            return;
        }

        /* Check required var exists */
        if ( typeof elem === 'undefined' || typeof height === 'undefined' || typeof more_text === 'undefined' || typeof less_text === 'undefined' ) {
            return;
        }

        /* Get element */
        if ( jQuery.type( elem ) === 'string' ) {
            elem = jQuery( elem ).first();
        } else if ( jQuery.type( elem ) !== 'object' ) {
            elem = false;
        }

        /* Check element */
        if ( ! elem || ! elem.length ) {
            return;
        }

        /* Check height in rem */
        if ( jQuery.type( height ) !== 'number' ) {
            return;
        }

        /* Check more text */
        if ( jQuery.type( more_text ) !== 'string' ) {
            return;
        }

        /* Check less text */
        if ( jQuery.type( less_text ) !== 'string' || less_text === false ) {
            less_text = '';
        }

        /* Create more element */
        var more_el = jQuery( '<div/>' ).html( '<div class="more-toggle"></div>' ).contents();

        /* Get rem value */
        var rem = parseFloat( jQuery( 'html' ).css( 'font-size' ) );
        rem = isNaN( rem ) ? 16 : rem;

        /* Get max height */
        var max_height = height * rem;

        /* Init status vars */
        var more_insert = false;
        var collapse = false;
        var expand = false;
        var reset = true;

        /* Update function on resize and orientation change */
        jQuery( window ).on( 'webpoint_resizeend', function() {
            webpoint_read_more_toggle_cb();
        } );

        /* Read more toggle callback function */
        function webpoint_read_more_toggle_cb() {

            var elem_height = elem.height();

            if ( elem_height > max_height && ! collapse && ! expand ) {
                webpoint_read_more_collapse();
            } else if ( elem_height < max_height && ! reset ) {
                webpoint_read_more_reset();
            }

        } // webpoint_read_more_toggle_cb();

        /* More link click */
        elem.on( 'click', '.more-toggle', function() {
            if ( collapse ) {
                webpoint_read_more_expand();
            } else {
                webpoint_read_more_collapse();
            }
        } );

        function webpoint_read_more_collapse() {
            /* Update element classes and CSS */
            elem
                .removeClass( 'content-expanded' )
                .addClass( 'content-collapsed' )
                .css( {
                    'max-height' : max_height + 'px'
                } );

            /* Insert more button */
            if ( ! more_insert ) {
                elem.append( more_el );
                more_insert = true;
            }

            /* Update more button text */
            more_el.html( more_text );

            /* Update more button class */
            more_el.removeClass( 'collapse' ).addClass( 'expand' );

            /* Show more button if is unvisible */
            if ( ! more_el.is( ':visible' ) ) {
                more_el.show();
            }

            /* Update status vars */
            collapse = true;
            expand = false;
            reset = false;
        } // webpoint_read_more_collapse();

        function webpoint_read_more_expand() {
            /* Update element classes and CSS */
            elem
                .removeClass( 'content-collapsed' )
                .addClass( 'content-expanded' )
                .removeAttr( 'style' );

            /* Update more button text */
            more_el.html( less_text );

            /* Update more button class */
            more_el.removeClass( 'expand' ).addClass( 'collapse' );

            /* Hide more button if less text is empty */
            if ( less_text === '' ) {
                more_el.hide();
            }

            /* Update status vars */
            collapse = false;
            expand = true;
            reset = false;
        } // webpoint_read_more_expand();

        function webpoint_read_more_reset() {
            /* Remove element classes and inline CSS */
            elem
                .removeClass( 'content-collapsed' )
                .removeClass( 'content-expanded' )
                .removeAttr( 'style' );

            /* Remove more button */
            more_el.remove();

            /* Update status vars */
            more_insert = false;
            collapse = false;
            expand = false;
            reset = true;
        } // webpoint_read_more_reset();

        /* Read more init */
        webpoint_read_more_toggle_cb();

    } // webpoint_read_more_toggle();

}


if ( typeof webpoint_archive_description_read_more !== 'function' ) {

    function webpoint_archive_description_read_more() {

        /* Check function status */
        if ( webpoint_get_globals( 'webpoint_archive_description_read_more' ) === '0' ) {
            return;
        }

        /* Only for terms and post type archives */
        var page_type = webpoint_get_globals( 'page_type' );
        if ( page_type === 'term' || page_type === 'post_type_archive' ) {
            webpoint_read_more_toggle( '.term-description', 12,
                webpoint_get_translation( 'Read more' ) + ' <i class="fa fa-angle-down"></i>',
                '<p>' + webpoint_get_translation( 'Hide' ) + ' <i class="fa fa-angle-up"></i></p>' );
        }

    } // webpoint_archive_description_read_more();

}


if ( typeof webpoint_sanitize_css_class !== 'function' ) {

    function webpoint_sanitize_css_class( name ) {

        return name.replace( /[^a-z0-9]/g, function( s ) {
            var c = s.charCodeAt( 0 );
            if ( c === 32 ) return '-';
            if ( c >= 65 && c <= 90 ) return '_' + s.toLowerCase();
            return '__' + ( '000' + c.toString( 16 ) ).slice( -4 );
        } );

    } // webpoint_sanitize_css_class();

}


if ( typeof webpoint_reset_form !== 'function' ) {

    function webpoint_reset_form( form ) {

        /* Check required var exists */
        if ( typeof form === 'undefined' ) {
            return;
        }

        /* Get form */
        if ( jQuery.type( form ) === 'string' ) {
            form = jQuery( form );
        } else if ( jQuery.type( form ) !== 'object' ) {
            form = false;
        }

        /* Check form */
        if ( ! form || ! form.length ) {
            return;
        }

        /* Reset form */
        form.each( function() {
            jQuery( this )[0].reset();
        } );

    } // webpoint_reset_form();

}


if ( typeof webpoint_get_query_var !== 'function' ) {

    function webpoint_get_query_var( variable ) {

        var query = window.location.search.substring(1);

        var vars = query.split( "&" );

        for ( var i = 0; i < vars.length; i++ ) {

            var pair = vars[i].split( "=" );

            if ( pair[0] === variable ) {
                return pair[1];
            }

        }

        return ( false );

    } // webpoint_get_query_var();

}

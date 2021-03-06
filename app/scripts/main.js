'use strict';

require.config( {
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps    : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        bootstrap: {
            deps    : [ 'jquery' ],
            exports : 'jquery'
        },
        datepicker: {
            deps    : [ 'jquery' ],
            exports : 'datepicker'
        },
	select2: {
			deps: [ 'jquery' ]
	},
        gzaisSearch: {
            deps: [ 'jquery', 'select2' ],
            exports: 'gzaisSearch'
        },
        selectpicker: {
            deps    : [ 'jquery' ],
            exports : 'selectpicker'
        },
        bootbox: {
            deps    : [ 'jquery', 'bootstrap' ],
            exports : 'bootbox'
	},
    },
    paths: {
        jquery               : '../bower_components/jquery/jquery',
        backbone             : '../bower_components/backbone/backbone',
        underscore           : '../bower_components/underscore/underscore',
        bootstrap            : 'vendor/bootstrap',
        datepicker           : 'vendor/bootstrap-datepicker',
        bootbox              : 'vendor/bootbox',
        selectpicker         : 'vendor/bootstrap-select',
		select2              : 'vendor/select2/select2',
		gzaisSearch          : 'vendor/jquery-gzais-search',
        App                  : 'models/App',
        AppView              : 'views/AppView',
        MainRouter           : 'routes/MainRouter',
        Employees            : 'collections/Employees',
        Employee             : 'models/Employee',
        EmployeesView        : 'views/Employeesview',
        EmployeeView         : 'views/EmployeeView',
        EmployeeDetailsView  : 'views/EmployeeDetailsView',
        Assets               : 'collections/Assets',
        Asset                : 'models/Asset',
        AssetsView           : 'views/AssetsView',
        AssetView            : 'views/AssetView',
        AssetDetailsView     : 'views/AssetDetailsView',
        InventoryReports     : 'collections/Inventory',
        InventoryReport      : 'models/InventoryReport',
        InventoryReportView  : 'views/InventoryReportView',
        InventoryReportsView : 'views/InventoryReportsView'
    }
} );

require( [
    'backbone',
    'App',
    'AppView',
    'MainRouter',
    'bootstrap',
    'datepicker',
    'selectpicker',
    'bootbox',
    'gzaisSearch'
], function( Backbone, App, AppView, MainRouter ) {

    var app    = window.App = window.App || {};
    var appData = JSON.parse( window.localStorage.getItem( 'app-data' ) ) || {};
    app.router = new MainRouter( );
    app.view   = new AppView( {
        model: new App( {
		baseUrl      : '/assets',
		user         : appData.employee || undefined,
		access_token : appData.access_token || undefined
        } )
    } );

    $( document ).on( 'click', 'a[href^="/"]', function( e ) {
        var href = $( e.currentTarget ).attr( 'href' );

        if ( !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey ) {
            e.preventDefault( );

            var url = href.replace( /^\//, '' ).replace( '#\/', '' );
            app.router.navigate( url, {
                trigger: true
            } );

            return false;
        }

    } );

    Backbone.history.start( {
        pushState: true
    } );

} );

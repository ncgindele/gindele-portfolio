$(function() {
    var portfolioViewModel = function() {
        var self = this;
        $.each($( ".slogan-word" ), function ( index, value ) {
            var duration = 700;
            var delay = 1300;
            var offset = 700;
            var timeout = window.setTimeout(function () {$( value ).addClass('orange', duration);}, index * offset + delay);
            var timeout2 = window.setTimeout(function () {$( value ).removeClass('orange', duration);}, index * offset + duration + delay);
            });
        self.portfolioArr = ko.observableArray(portfolioData);
        self.serverArr = ko.observableArray(keywordData.server);
        self.clientArr = ko.observableArray(keywordData.client);
        self.databaseArr = ko.observableArray(keywordData.database);
        self.apiArr = ko.observableArray(keywordData.APIs);
        self.getPortItem = function(id) {
            return self.portfolioArr().find(function(datum) {
                if ( datum.id == id) {
                    return datum;
                }
            });
        };
        self.sortPort = function() {
            $('.port-card').each(function(index, value) {
                var id = $( this ).attr('id').slice(10);
                var item = self.getPortItem(id);
                var order = item.origOrder - $( this ).find('.active').length;
                $( this ).attr('style', 'order:' + order);
            });
        };
        self.resetKeywords = function() {
            $( '.active' ).removeClass( 'active' );
            self.sortPort();
        };
        self.toggleKeyword = function(elem) {
            $elem = $( '#' + elem.id )
            var keyword = $elem.text().replace(" ", "").replace(" ", "");
            if ( $elem.hasClass( 'active' ) ) {
                $elem.removeClass( 'active' );
                $( "span.keyspan-" + keyword + ".active" ).removeClass( 'active' );
            } else {
                $elem.addClass('active');
                $( "span.keyspan-" + keyword  ).addClass( 'active' );
            }
            self.sortPort()
        };
        $( '.keyword-class' ).on('click', function() {
            $keywords = $( this ).next().children()
            if ($( this ).hasClass( 'active' )){
                $( this ).removeClass( 'active' );
                $keywords.removeClass( 'active' );
                $keywords.each(function(i, val) {
                    var keyword = $( this ).text().replace(" ", "").replace(" ", "");
                    $( "span.keyspan-" + keyword + ".active" ).removeClass( 'active' );
                });
            } else {
                $( this ).addClass( 'active' );
                $keywords.addClass( 'active' );
                $keywords.each( function(i, val) {
                    var keyword = $( this ).text().replace(" ", "").replace(" ", "");
                    $( "span.keyspan-" + keyword  ).addClass( 'active' );
                });
            }
            self.sortPort()
        });
    };
    ko.applyBindings(new portfolioViewModel);
});

$(document).ready(function() {
    $('#server-class').popover({
        trigger: 'focus'
    });
    var notFirstTime;
    $('#sidebar').hover(function(){
        if (notFirstTime != true) {
            $('#server-class').popover('show');
            $('.keywords-class-container li').addClass('sidebar-highlight');
            notFirstTime = true;
            var dismiss = window.setTimeout(function () {
                $('.keywords-class-container li').removeClass('sidebar-highlight');
            }, 5000);
            var dismiss2 = window.setTimeout(function () {
                $('#server-class').popover('dispose');
            }, 5000);
    }
    });
    var contentY = $('#end-slogan').offset().top;
    $(window).scroll(function (e) {
        var y = $(this).scrollTop();
        if (y >= contentY) {
            $('#sticky-header').removeClass('hide-bar');
            $('#sidebar').removeClass('light-text');
        } else {
            $('#sticky-header').addClass('hide-bar');
            $('#sidebar').addClass('light-text');
        }
    });
})

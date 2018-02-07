document.documentElement.className += ' js';

// create local scope with a self executing anonymous function
(function() {
    var listControl = {
        'config': {
            'container' : $('.list-control')
        },
        'init': function(config) {
            // 1. enable any custom config object to be merged
            if (config && typeof(config) == 'object') {
                $.extend(this.config, config);
            }

            // 2. cached/created DOM elements for further use
            this.$container = this.config.container;        
            this.$sections = this.$container.find('ul.sections > li');
            
            // section nav
            this.$navSection = $('<ul/>')
                .attr('class', 'nav-section')
                .prependTo(this.$container);
            
            // item nav
            this.$itemNav = $('<ul/>')
                .attr('class', 'nav-item')
                .insertAfter(this.$navSection);
            
            // item content
            this.$content = $('<p/>')
                .attr('class', 'content')
                .insertAfter(this.$itemNav);

            // create the section nav and select the first section item
            this.buildNavSection(this.$sections);
            this.$navSection.find('li:first button').click();

            // remove original HTML
            this.$container.find('ul.sections').remove();

            // 3. set completed flag
            this.initialised = true;
        },
        'buildNavSection' : function($sections) {
            var that = this;
            
            // sections i.e., first level nav <li>s
            $sections.each(function() {
                var $section = $(this);
                var $li = $('<li/>');

                $('<button/>')
                    // create button text from section h2
                    .text($section.find('h2:first').text())

                    // save reference to original section
                    .data('section', $section)

                    // bind behaviour
                    .click(that.showSection)

                    .appendTo($li);

                // append to ul.section-nav
                $li.appendTo(that.$navSection)
            });
        },
        'buildNavItem' : function($items) {
            var that = this;

            // items i.e., second level nav <li>s
            $items.each(function() {
                var $item = $(this);
                var $li = $('<li/>');
            
                $('<button/>')
                // create button text from item h3
                .text($item.find('h3:first').text())

                // save reference to original item
                .data('item', $item)

                // bind behaviour
                .click(that.showItemContent)
                
                .appendTo($li);
                
                // append to ul.item-nav
                $li.appendTo(that.$itemNav)
            });
        },
        'showSection' : function() { 
            var that = listControl;
            var $button = $(this);
            var $li = $button.parent();
            var $section = $button.data('section'); // set in buildNavSection
            var $items = $section.find('ul li');

            listControl.$itemNav.empty();
            listControl.$content.empty();

            $li.addClass('current').siblings().removeClass('current');

            // create the section items
            that.buildNavItem($items);

            // select the first item
            that.$itemNav.find('li:first button').click();
        },
        'showItemContent' : function() { 
            var that = listControl;
            var $button = $(this);
            var $li = $button.parent();
            var $item = $button.data('item'); // set in buildNavItem

            $li.addClass('current').siblings().removeClass('current');

            // update .content with the item's HTML
            that.$content.html($item.html());
        }
    };

    listControl.init();

    //listControl.init({ 'container' : $('.list-alternate') });
})()

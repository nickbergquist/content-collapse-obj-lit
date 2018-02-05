document.documentElement.className += ' js';

var listControl = {
    'config': {
        'container' : $('.list-control')
    },
    'init': function(config) {
        // 1. enable any custom config object to be merged
        if (config && typeof(config) == 'object') {
            $.extend(listControl.config, config);
        }

        // 2. cached/created DOM elements for further use
        listControl.$container = listControl.config.container;        
        listControl.$sections = listControl.$container.find('ul.sections > li');
        
        // section nav
        listControl.$navSection = $('<ul/>')
            .attr('class', 'nav-section')
            .prependTo(listControl.$container);
        
        // item nav
        listControl.$itemNav = $('<ul/>')
            .attr('class', 'nav-item')
            .insertAfter(listControl.$navSection);
        
        // item content
        listControl.$content = $('<p/>')
            .attr('class', 'content')
            .insertAfter(listControl.$itemNav);

        // create the section nav and select the first section item
        listControl.buildNavSection(listControl.$sections);
        listControl.$navSection.find('li:first button').click();

        // remove original HTML
        listControl.$container.find('ul.sections').remove();

        // 3. set completed flag
        listControl.initialised = true;
    },
    'buildNavSection' : function($sections) {
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
                .click(listControl.showSection)

                .appendTo($li);

            // append to ul.section-nav
            $li.appendTo(listControl.$navSection)
        });
    },
    'buildItemNav' : function($items) {
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
              .click(listControl.showItemContent)
              
              .appendTo($li);
            
            // append to ul.item-nav
            $li.appendTo(listControl.$itemNav)
        });
    },
    'showSection' : function() { 
        var $button = $(this);
        var $li = $button.parent();
        var $section = $button.data('section'); // set in buildNavSection
        var $items = $section.find('ul li');

        listControl.$itemNav.empty();
        listControl.$content.empty();

        $li.addClass('current').siblings().removeClass('current');

        // create the section items
        listControl.buildItemNav($items);

        // select the first item
        listControl.$itemNav.find('li:first button').click();
    },
    'showItemContent' : function() { 
        var $button = $(this);
        var $li = $button.parent();
        var $item = $button.data('item'); // set in buildItemNav

        $li.addClass('current').siblings().removeClass('current');

        // update .content with the item's HTML
        listControl.$content.html($item.html());
    }
};

// on DOM ready
$(function () {
    
    listControl.init();

    //listControl.init({ 'container' : $('.list-alternate') });
});

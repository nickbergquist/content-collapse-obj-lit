
var listControl = {
    'config': {
        'container' : $('#listControl')
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
            .attr('id', 'section-nav')
            .prependTo(listControl.$container);
        
        // item nav
        listControl.$itemNav = $('<ul/>')
            .attr('id', 'item-nav')
            .insertAfter(listControl.$navSection);
        
        // content
        listControl.$content = $('<p/>')
            .attr('id', 'content')
            .insertAfter(listControl.$itemNav);

        // create the section nav and activate the first section item
        listControl.buildnavSection(listControl.$sections);
        listControl.$navSection.find('li:first').click();

        // hide HTML
        listControl.$container.find('ul.sections').hide();

        // 3. set completed flag
        listControl.initialised = true;
    },
    'buildnavSection' : function($sections) {
        // sections i.e., first level nav <li>s
        $sections.each(function() {
            
            var $section = $(this);

            // populate the section nav
            $('<li/>')
                // create nav text from section (<li>) h2
                .text($section.find('h2:first').text())

                // append to section nav
                .appendTo(listControl.$navSection)

                // save reference to original section in the new <li>
                .data('section', $section)

                // bind behaviour
                .click(listControl.showSection);
        });
    },
    'buildItemNav' : function($items) {
        // items i.e., second level nav <li>s
        $items.each(function() {
            var $item = $(this);
        
            $('<li>')
              .text($item.find('h3:first').text())
              .appendTo(listControl.$itemNav)
              .data('item', $item)
              .click(listControl.showItemContent);
        });
    },
    'showSection' : function() { 
        var $li = $(this);
        var $section = $li.data('section');
        var $items = $section.find('ul li');

        listControl.$itemNav.empty();
        listControl.$content.empty();

        $li.addClass('current').siblings().removeClass('current');

        listControl.buildItemNav($items);

        listControl.$itemNav.find('li:first').click();
    },
    'showItemContent' : function() { 
        var $li = $(this);
        var $item = $li.data('item');

        $li.addClass('current').siblings().removeClass('current');

        listControl.$content.html($item.html());
    }
};

$(function () {
    listControl.init();
});

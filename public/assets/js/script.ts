(function ($, window, document, undefined)
{
	'use strict';
	
	$(function ()
	{
            $(document).on("click", ".openMenu",  function()
	    {
	    	$(this).toggleClass("active");
	        $(".part3").slideToggle(500);
	    });
	});
	$(window).on("resize", function()
	{
		if($(this).width() > 500)
		{
			$(".openMenu").removeClass("active");
		}
	});
})(jQuery, window, document);
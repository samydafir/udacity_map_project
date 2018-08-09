/**
 * toggles sidebar size (expanded, collapsed)
 */
$('#menu-button').click(function() {
  $("aside").toggleClass('collapsed');
  $("#map").toggleClass('full');
  $("#menu-content").toggleClass('hidden');
});

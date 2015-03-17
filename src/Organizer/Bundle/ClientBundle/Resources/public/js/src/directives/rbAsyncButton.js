function disableButton($button) {
  $button.attr('disabled', true);
  $button.addClass('btn-async-processing');
}

function enableButton($button) {
  $button.attr('disabled', false);
  $button.removeClass('btn-async-processing');
}

module.exports = function () {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: '/bundles/organizerclient/js/templates/rbAsyncButton.html',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function () {
        if(ngModel.$modelValue === true) {
          disableButton(elem);
        } else {
          enableButton(elem);
        }
      });
    }
  };
};
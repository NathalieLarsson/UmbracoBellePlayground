//this controller simply tells the dialogs service to open a mediaPicker window
//with a specified callback, this callback will receive an object with a selection on it
angular.module('umbraco').controller("Demo.MySecondPropertyController",
    function ($rootScope, $scope, dialogService, mediaResource, imageHelper, $log) {
    	//function setupViewModel() {
    	//	$scope.images = [];
    	//	$scope.ids = [];

    	//	if ($scope.model.value) {
    	//		$scope.ids = $scope.model.value.split(',');

    	//		mediaResource.getByIds($scope.ids).then(function (medias) {
    	//			//img.media = media;
    	//			_.each(medias, function (media, i) {
    	//				//shortcuts
    	//				//TODO, do something better then this for searching
    	//				var img = {};
    	//				img.src = imageHelper.getImagePropertyValue({ imageModel: media });
    	//				img.thumbnail = imageHelper.getThumbnailFromPath(img.src);
    	//				$scope.images.push(img);
    	//			});
    	//		});
    	//	}
    	//}

    	//setupViewModel();

    	$scope.remove = function (index) {
    		$scope.images.splice(index, 1);
    		$scope.ids.splice(index, 1);
    		$scope.sync();
    	};

    	$scope.add = function () {
    		dialogService.mediaPicker({
    			callback: function (data) {

    				debugger;
    				//data.selection contains an array of images
    				_.each(data.selection, function (media, i) {
    					//try using $log.log(item) to see what this data contains

    					var img = {};
    					img.id = media.id;
    					img.src = imageHelper.getImagePropertyValue({ imageModel: media, scope: $scope });
    					img.thumbnail = imageHelper.getThumbnailFromPath(img.src);
    					$scope.images.push(img);
    					$scope.ids.push(img.id);
    				});

    				$scope.sync();
    			}
    		});
    	};

    	$scope.sync = function () {
    		$scope.model.value = $scope.ids.join();
    	};

    	//$scope.model.onValueChanged = function (newVal, oldVal) {
    	//	//update the display val again if it has changed from the server
    	//	setupViewModel();
    	//};
    });
// swap gallery script
'use strict'

//** slide gallery constructor
var SlideGalleryFactory = function(gID) {
	this.galleryID = gID;
	var slideSpeed = 500;
	var scaleSpeed = 400;
	//** get dimensions of the gallery
	var swapGalleryDiv = document.querySelector(this.galleryID);
	var swapGalleryUL = document.querySelector(this.galleryID + " ul")
	var singleGallery = document.querySelector(this.galleryID + " ul li");
	var singleGalleryWidth = window.getComputedStyle(singleGallery, null).getPropertyValue("width");
	var numSingleGalleryWidth = parseInt(singleGalleryWidth);

	var galleryList = document.querySelectorAll(this.galleryID + " ul li");
	var galleryListLength = document.querySelectorAll(this.galleryID + " ul li").length;
	var currentULPos = numSingleGalleryWidth/2;

	//** get total width of the gallery list.
	var totalSingleWidth = function() {
		var singleGalleryMarginLeft = parseInt(window.getComputedStyle(singleGallery, null).getPropertyValue("margin-left"));
		var singleGalleryMarginRight = parseInt(window.getComputedStyle(singleGallery, null).getPropertyValue("margin-right"));
		return (numSingleGalleryWidth + singleGalleryMarginLeft + singleGalleryMarginRight);
	}

	// set scale of element with all the vendor prefixes
	var setVendorTransformScale = function(element, value) {
		element.style.webkitTransform = "scale(" + value + ")";
		element.style.mozTransform = "scale(" + value + ")";
		element.style.transformransform = "scale(" + value + ")";
	}

	var setNonActiveSlide = function(list,num) {
		var scaleValue = 1 - (num * 0.2);
		var opacityValue = 1 - (num * 0.5);

		galleryList[list].style.zIndex = galleryList.length - num;
		galleryList[list].style.opacity = opacityValue;
		setVendorTransformScale(galleryList[list], scaleValue);
		
	}

	var moveGallery = function(direction) {
			// direction ( 1 is moving forward) (-1 is moving backward)
			var slide = parseInt(direction);

			for( var i = 0; i < galleryList.length; i++ ) {
				if (galleryList[i].classList.contains("active")) {
					if (galleryList[i + slide]) {
						galleryList[i].style.zIndex = galleryList.length - 1;
						galleryList[i].classList.remove("active");

						galleryList[i + slide].classList.add("active");
						galleryList[i + slide].style.zIndex = galleryList.length;
						galleryList[i + slide].style.opacity = 1;
						setVendorTransformScale(galleryList[i+slide], 1)

						//**  create new arrays for right side
						for (var j = (i + slide); j < galleryList.length; j++ ) {
							// ** set value from active img to all images after
							var numForward = j - (i + slide);
							setNonActiveSlide(j, numForward);
						}

						//**  create new arrays for left side
						for (var k = (i + slide); k >= 0; k-- ) {
							var numBackward = (k - (i+slide)) * -1;
							setNonActiveSlide(k, numBackward);
						}

						//** move the gallery
						currentULPos = (currentULPos - (( parseInt(singleGalleryWidth) * slide) / 2));
						console.log(currentULPos);
						swapGalleryUL.style.marginLeft = currentULPos + "px";
						return;
					}
				}
			}
		}

	return {
		slideInfo: {
			slideSpeed: 500,
			scaleSpeed: 400
		},
		init: (function() {
			var totalUL = 0;
			var initScale = 0;
			swapGalleryUL.style.transition = "0.3s ease-in";
			for( var i=0; i<galleryListLength; i++) {
				totalUL += totalSingleWidth;
				initScale = 1 - (i * 0.2);

				galleryList[i].style.left = (parseInt(singleGalleryWidth) * i) / 2 + "px";
				galleryList[i].style.zIndex = galleryListLength - i;
				galleryList[i].style.opacity = 1 - (i * 0.5);
				setVendorTransformScale(galleryList[i], initScale);
			};
			//set gallery ul to be total of all the gallery
			var totalULWidth = swapGalleryUL.style.width = ((totalUL) + "px");

			//add transition to the gallery list
			setTimeout(function () {
				for ( var i = 0; i < galleryListLength; i++ ) {
					galleryList[i].style.transition = 400 + "ms";
				}
			}, 0.1 );

		})(),
		button: (function() {
			document.getElementById("nextBtn").addEventListener("click", function() {
				moveGallery(1)
			});
			document.getElementById("prevBtn").addEventListener("click", function() {
				moveGallery(-1) 
			});
		})()
	}
//** close function
};

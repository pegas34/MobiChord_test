app.controller('MainController', function($scope) {
    $scope.products = [
        {
            image: 'img/iphone1.jpg',
            name: 'Apple IPhone 5S 16GB (Space Gray)',
            infoList: [
                {info: '4-inch Retina display'},
                {info: 'A7 chip with M2 motion compressor'},
                {info: 'Touch ID fingerprint sensor'},
                {info: 'New 8MP iSight camera with True Tone flash and 1080p HD video recording'}
            ],
            price: 680.99,
            shipping: 12.99,
            left: 9,
            cardTxt: 'Add to cart'
        },
        {
            image: 'img/iphone2.jpg',
            name: 'Apple IPhone 5S 16GB (White)',
            infoList: [
                {info: '4-inch Retina display'},
                {info: 'A7 chip with M2 motion compressor'},
                {info: 'Touch ID fingerprint sensor'},
                {info: 'New 8MP iSight camera with True Tone flash and 1080p HD video recording'}
            ],
            price: 685.99,
            shipping: 12.98,
            left: 3,
            cardTxt: 'Add to cart'
        }
    ];

    $scope.addCard = function(index, $event) {
        angular.element($event.target)
            .addClass('disabled')
            .attr('disabled', 'disabled');
        $scope.products[index].cardTxt = 'In card';
    }
});

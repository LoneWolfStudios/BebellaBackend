var Bebella = angular.module('Bebella', ['ui.router', 'datatables']);

var APP_URL = $("#APP_URL").val();

function view(path) {
    return APP_URL + '/admin/' + path;
}

function api_v1(path) {
    return APP_URL + '/api/v1/' + path;
}

function attr(dest, src) {
    for (var e in src) {
        if (e == "created_at" || e == "updated_at") {
            dest[e] = new Date(src[e]);
        } else if (e.startsWith("has_") || e.startsWith("is_") || e.startsWith("used_for_") || e == "active") {
            dest[e] = (src[e] === 1);
        } else {
            dest[e] = src[e];
        }
    }
}

Bebella.run([
    function () {
        
    }
]);

Bebella.factory('Category', [
    function () {
        var Category = new Function();
        
        return Category;
    }
]);


Bebella.factory('Channel', [
    function () {
        var Channel = new Function();
        
        return Channel;
    }
]);



Bebella.factory('Product', [
    function () {
        var Product = new Function();
        
        return Product;
    }
]);



Bebella.factory('Recipe', [
    function () {
        var Recipe = function () {
            this.tags = new Array();
            this.steps = new Array();
            this.products = new Array();
            this.comments = new Array();
            this.related = new Array();
        };
        
        return Recipe;
    }
]);




Bebella.factory('User', [
    function () {
        var User = new Function();
        
        return User;
    }
]);


Bebella.service('CurrentCategory', ['Category',
    function (Category) {
        var service = this;
        
        var _category = new Category();
        
        service.get = function () {
            return _category;
        };
        
        service.clear = function () {
            _category = new Category();
        };
        
    }
]);


Bebella.service('CurrentChannel', ['Channel',
    function (Channel) {
        var service = this;
        
        var _channel = new Channel();
        
        service.get = function () {
            return _channel;
        };
        
        service.clear = function () {
            _channel = new Channel();
        };
        
    }
]);




Bebella.service('CurrentProduct', ['Product',
    function (Product) {
        var service = this;
        
        var _product = new Product();
        
        service.get = function () {
            return _product;
        };
        
        service.clear = function () {
            _product = new Product();
        };
        
    }
]);



Bebella.service('CurrentRecipe', ['Recipe',
    function (Recipe) {
        var service = this;
        
        var _recipe = new Recipe();
        
        service.get = function () {
            return _recipe;
        };
        
        service.clear = function () {
            _recipe = new Recipe();
        };
        
    }
]);




Bebella.service('CategoryRepository', ['$http', '$q', 'Category',
    function ($http, $q, Category) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('category/find/' + id)).then(
                function (res) {
                    var category = new Category();
                    
                    attr(category, res.data);
                    
                    deferred.resolve(category);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("category/all")).then(
                function (res) {
                    var categories = _.map(res.data, function (json) {
                        var category = new Category();
                        
                        attr(category, json);
                        
                        return category;
                    });
                    
                    deferred.resolve(categories);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (category) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(category);
            
            $http.post(api_v1("category/edit"), data).then(
                 function (res) {
                     deferred.resolve(category);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (category) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(category);
            
            $http.post(api_v1("category/save"), data).then(
                function (res) {
                    category.id = res.data.id;
                    
                    deferred.resolve(category);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);



Bebella.service('ChannelRepository', ['$http', '$q', 'Channel',
    function ($http, $q, Channel) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('channel/find/' + id)).then(
                function (res) {
                    var channel = new Channel();
                    
                    attr(channel, res.data);
                    
                    deferred.resolve(channel);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("channel/all")).then(
                function (res) {
                    var channels = _.map(res.data, function (json) {
                        var channel = new Channel();
                        
                        attr(channel, json);
                        
                        return channel;
                    });
                    
                    deferred.resolve(channels);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (channel) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(channel);
            
            $http.post(api_v1("channel/edit"), data).then(
                 function (res) {
                     deferred.resolve(channel);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (channel) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(channel);
            
            $http.post(api_v1("channel/save"), data).then(
                function (res) {
                    channel.id = res.data.id;
                    
                    deferred.resolve(channel);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);




Bebella.service('ProductRepository', ['$http', '$q', 'Product',
    function ($http, $q, Product) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('product/find/' + id)).then(
                function (res) {
                    var product = new Product();
                    
                    attr(product, res.data);
                    
                    deferred.resolve(product);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("product/all")).then(
                function (res) {
                    var products = _.map(res.data, function (json) {
                        var product = new Product();
                        
                        attr(product, json);
                        
                        return product;
                    });
                    
                    deferred.resolve(products);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (product) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(product);
            
            $http.post(api_v1("product/edit"), data).then(
                 function (res) {
                     deferred.resolve(product);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (product) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(product);
            
            $http.post(api_v1("product/save"), data).then(
                function (res) {
                    product.id = res.data.id;
                    
                    deferred.resolve(product);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);




Bebella.service('RecipeRepository', ['$http', '$q', 'Recipe',
    function ($http, $q, Recipe) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('recipe/find/' + id)).then(
                function (res) {
                    var recipe = new Recipe();
                    
                    attr(recipe, res.data);
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("recipe/all")).then(
                function (res) {
                    var recipes = _.map(res.data, function (json) {
                        var recipe = new Recipe();
                        
                        attr(recipe, json);
                        
                        return recipe;
                    });
                    
                    deferred.resolve(recipes);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/edit"), data).then(
                 function (res) {
                     deferred.resolve(recipe);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/save"), data).then(
                function (res) {
                    recipe.id = res.data.id;
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);





Bebella.service('UserRepository', ['$http', '$q', 'User',
    function ($http, $q, User) {
        var repository = this;
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("user/all")).then(
                function (res) {
                    
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);


Bebella.controller('CategoryEditCtrl', ['$scope', '$stateParams', 'CategoryRepository',
    function ($scope, $stateParams, CategoryRepository) {
    
        $scope.edit = function () {
            CategoryRepository.edit($scope.category).then(
                function onSuccess (category) {
                    alert("Categoria editada com sucesso.");
                },
                function onError (res) {
                    alert("Erro ao criar esta categoria.");
                }
            );
        };
        
        CategoryRepository.find($stateParams.categoryId).then(
            function onSuccess (category) {
                $scope.category = category;
            },
            function onError (res) {
                alert("Houve um erro na obtenção dos dados desta categoria");
            }
        );
        
    }
]);




Bebella.controller('CategoryListCtrl', ['$scope', 'CategoryRepository',
    function ($scope, CategoryRepository) {
        
        CategoryRepository.all().then(
            function onSuccess (list) {
                $scope.categories = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de categorias");
            }
        );
        
    }
]);


Bebella.controller('CategoryNewCtrl', ['$scope', 'CurrentCategory', 'CategoryRepository',
    function ($scope, CurrentCategory, CategoryRepository) {
        $scope.category = CurrentCategory.get();
    
        $scope.create = function () {
            CategoryRepository.save($scope.category).then(
                function onSuccess (category) {
                    alert("Categoria cadastrada com sucesso.");
                    CurrentCategory.clear();
                },
                function onError (res) {
                    alert("Erro ao criar esta categoria.");
                }
            );
        };
        
        $scope.clear = function () {
            CurrentCategory.clear();
            $scope.category = CurrentCategory.get();
        };
    }
]);



Bebella.controller('ChannelListCtrl', ['$scope', 'ChannelRepository',
    function ($scope, ChannelRepository) {
        
        ChannelRepository.all().then(
            function onSuccess (list) {
                $scope.channels = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de canais");
            }
        );
        
    }
]);


Bebella.controller('ChannelNewCtrl', ['$scope', 'CurrentChannel', 'ChannelRepository',
    function ($scope, CurrentChannel, ChannelRepository) {
        
        $scope.channel = CurrentChannel.get();
        
        $scope.create = function () {
            ChannelRepository.save($scope.channel).then(
                function onSuccess (channel) {
                    alert(channel.id);
                    alert("Canal cadastrado com sucesso.");
                },
                function onError (res) {
                    alert("Houve um erro no cadasto deste canal.");
                }
            );
        };
        
        $scope.clear = function () {
            CurrentChannel.clear();
            $scope.channel = CurrentChannel.get();
        };
        
    }
]);



Bebella.controller('ProductOptionListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product Option List";
    }
]);


Bebella.controller('ProductOptionNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product Option New";
    }
]);



Bebella.controller('ProductEditCtrl', ['$scope', '$stateParams', 'ProductRepository', 'CategoryRepository',
    function ($scope, $stateParams, ProductRepository, CategoryRepository) {
    
        $scope.edit = function () {
            ProductRepository.edit($scope.product).then(
                function onSuccess (product) {
                    alert("Produto editado com sucesso.");
                },
                function onError (res) {
                    alert("Erro ao criar este produto.");
                }
            );
        };
        
        ProductRepository.find($stateParams.productId).then(
            function onSuccess (product) {
                $scope.product = product;
            },
            function onError (res) {
                alert("Houve um erro na obtenção dos dados deste produto");
            }
        );

        CategoryRepository.all().then(
            function onSuccess (list) {
                $scope.categories = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de categorias");
            }
        );
        
    }
]);



Bebella.controller('ProductListCtrl', ['$scope', 'ProductRepository',
    function ($scope, ProductRepository) {
        
        ProductRepository.all().then(
            function onSuccess (list) {
                $scope.products = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de produtos.");
            }
        );
        
    }
]);


Bebella.controller('ProductNewCtrl', ['$scope', 'CurrentProduct', 'CategoryRepository', 'ProductRepository',
    function ($scope, CurrentProduct, CategoryRepository, ProductRepository) {
        
        $scope.product = CurrentProduct.get();
        
        $scope.create = function () {
            ProductRepository.save($scope.product).then(
                function onSuccess (product) {
                    alert(product.id);
                    alert("Produto criado com sucesso.");
                },
                function onError () {
                    alert("Houve um erro na criação do produto.");
                }
            );
        };
        
        $scope.clear = function () {
            CurrentProduct.clear();
            $scope.product = CurrentProduct.get();
        };
        
        CategoryRepository.all().then(
            function onSuccess (list) {
                $scope.categories = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção das lista de categorias");
            }
        );
        
    }
]);



Bebella.controller('RecipeListCtrl', ['$scope', 'RecipeRepository',
    function ($scope, RecipeRepository) {
        
        RecipeRepository.all().then(
            function onSuccess (list) {
                $scope.recipes = list;
            },
            function onError (res) {
                alert("Erro ao carregar lista de receitas");
            } 
        );
        
    }
]);


Bebella.controller('RecipeNewCtrl', ['$scope', 'ChannelRepository', 'RecipeRepository', 'ProductRepository', 'CurrentRecipe',
    function ($scope, ChannelRepository, RecipeRepository, ProductRepository, CurrentRecipe) {
        
        $scope.recipe = CurrentRecipe.get();
        
        ChannelRepository.all().then(
            function onSuccess (list) {
                $scope.channels = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de canais");
            }
        );
        
        ProductRepository.all().then(
            function onSuccess (list) {
                $scope.products = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de produtos");
            }
        );
        
        
        $scope.create = function () {
            RecipeRepository.save($scope.recipe).then(
                function (recipe) {
                    alert(recipe.id);
                    alert("Nova receita criada com sucesso.");
                },
                function (res) {
                    alert("Houve um erro na criação desta receita.");
                }
            );
        };
        
        $scope.clear = function () {
            CurrentRecipe.clear();
            $scope.recipe = CurrentRecipe.get();
        };
        
        $scope.newTag = function () {
            $scope.recipe.tags.push({});
        };
        
        $scope.removeTag = function () {
            $scope.recipe.tags.pop();
        };
        
        $scope.newStep = function () {
            $scope.recipe.steps.push({});
        };
        
        $scope.removeStep = function () {
            $scope.recipe.steps.pop();
        };
        
        $scope.newProduct = function () {
            $scope.recipe.products.push({});
        };
        
        $scope.removeProduct = function () {
            $scope.recipe.products.pop();
        };
    }
]);



Bebella.controller('StoreListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Store List";
    }
]);


Bebella.controller('StoreNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Store New";
    }
]);



Bebella.controller('UserListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "User List";
    }
]);


Bebella.controller('UserNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "User New";
    }
]);



Bebella.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);


Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        
                .state('user_new', {
                    url: '/user/new',
                    views: {
                        MainContent: {
                            templateUrl: view('user/new')
                        }
                    }
                })
                
                .state('user_list', {
                    url: '/user/list',
                    views: {
                        MainContent: {
                            templateUrl: view('user/list')
                        }
                    }
                })

                .state('recipe_new', {
                    url: '/recipe/new',
                    views: {
                        MainContent: {
                            templateUrl: view('recipe/new')
                        }
                    }
                })
                
                .state('recipe_list', {
                    url: '/recipe/list',
                    views: {
                        MainContent: {
                            templateUrl: view('recipe/list')
                        }
                    }
                })
                
                .state('category_new', {
                    url: '/category/new',
                    views: {
                        MainContent: {
                            templateUrl: view('category/new')
                        }
                    }
                })
                
                .state('category_list', {
                    url: '/category/list',
                    views: {
                        MainContent: {
                            templateUrl: view('category/list')
                        }
                    }
                })
                
                .state('category_edit', {
                    url: '/category/edit/{categoryId}',
                    views: {
                        MainContent: {
                            templateUrl: view('category/edit')
                        }
                    }
                })
                
                .state('store_new', {
                    url: '/store/new',
                    views: {
                        MainContent: {
                            templateUrl: view('store/new')
                        }
                    }
                })
                
                .state('store_list', {
                    url: '/store/list',
                    views: {
                        MainContent: {
                            templateUrl: view('store/list')
                        }
                    }
                })
                
                .state('channel_new', {
                    url: '/channel/new',
                    views: {
                        MainContent: {
                            templateUrl: view('channel/new')
                        }
                    }
                })
                
                .state('channel_list', {
                    url: '/channel/list',
                    views: {
                        MainContent: {
                            templateUrl: view('channel/list')
                        }
                    }
                })
                
                .state('product_new', {
                    url: '/product/new',
                    views: {
                        MainContent: {
                            templateUrl: view('product/new')
                        }
                    }
                })
                
                .state('product_list', {
                    url: '/product/list',
                    views: {
                        MainContent: {
                            templateUrl: view('product/list')
                        }
                    }
                })
                
                .state('product_edit', {
                    url: '/product/edit/{productId}',
                    views: {
                        MainContent: {
                            templateUrl: view('product/edit')
                        }
                    }
                })
                
                .state('product_option_new', {
                    url: '/product_option/new',
                    views: {
                        MainContent: {
                            templateUrl: view('product_option/new')
                        }
                    }
                })
                
                .state('product_option_list', {
                    url: '/product_option/list',
                    views: {
                        MainContent: {
                            templateUrl: view('product_option/list')
                        }
                    }
                })
        
                .state('home', {
                    url: '/',
                    views: {
                        MainContent: {
                            templateUrl: view('dashboard')
                        }
                    }
                });
        
    }
]);
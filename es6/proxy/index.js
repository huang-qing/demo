const target = {
    add: function(a, b) {
      return a + b;
    }
  }
  
  const proxyAdd = new Proxy(target.add, {
    apply: function(target, thisArg, args) {
      console.log(args);
      return target.apply(thisArg, args);
    }
  });
  
  proxyAdd(4, 6);
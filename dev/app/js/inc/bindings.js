// Asset Earn binding
var assetEarnModel = function() {
    var self = this;
    self.monthly = ko.observable(0);
    self.yearly = ko.observable(0);

    self.cash = ko.observable(12);
    self.bonds = ko.observable(45);
    self.equities = ko.observable(0);
    self.real_estates = ko.observable(16);
    self.commodities = ko.observable(0);
    self.modern = ko.observable(0);
    self.passion = ko.observable(27);
    
    self.result = ko.pureComputed(function() {
        return +self.monthly() * 12  + +self.yearly();
    });
};
var assetEarn = new assetEarnModel();
ko.applyBindings(assetEarn);

// Subscribes
assetEarn.result.subscribe( (newVal) => {
    asset_earn_annual = newVal;
});

assetEarn.cash.subscribe( (newVal) => {
    allo_cash = parseInt(newVal);
});
assetEarn.bonds.subscribe( (newVal) => {
    allo_bonds = parseInt(newVal);
});
assetEarn.equities.subscribe( (newVal) => {
    allo_equities = parseInt(newVal);
});
assetEarn.real_estates.subscribe( (newVal) => {
    allo_real_estates = parseInt(newVal);
});
assetEarn.commodities.subscribe( (newVal) => {
    allo_commodities = parseInt(newVal);
});
assetEarn.modern.subscribe( (newVal) => {
    allo_modern = parseInt(newVal);
});
assetEarn.passion.subscribe( (newVal) => {
    allo_passion = parseInt(newVal);
});
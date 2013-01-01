jquery.capsChecker
==================

jquery.capsChecker is a jQuery plugin to check whether caps lock is turned on. It is the only plugin of its kind, which can recognize caps lock on numbers. That's important for users with standard German keyboard layout. 

Usage
-----

### Quickstart: 

```javascript
$('#txtTest').capsChecker({
	capson: function(e, isOn) {
		// ...
	},
	capsoff: function(e, isOn) {
		// ...
	}
});
```

Both options are optional and false by default.

### Manual binding of handlers

```javascript
$('#txtTest').capsChecker();

$('#txtTest').on('capson', function(e, isOn) {
	//...
});

$('#txtTest').on('capsoff', function(e, isOn) {
	//...
});
```

### Removing a capsChecker from the input field

```javascript
$('#txtTest').capsChecker('destroy');
```

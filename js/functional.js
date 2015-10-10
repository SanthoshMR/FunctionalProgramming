jQuery(document).ready(function($) {
	$("#btnGetTasks").click(function(e) {
		e.preventDefault();
		var memberName = $("#inputName").val();
		fetchDataWithCompose(memberName)
			.then(function(tasks) {
				displayResults(memberName, tasks);
			});
	});

	var dot = R.curry(function(prop, obj) {
		return obj[prop];
	});

	var propEquals = function(prop, val) {
		return function(obj) {
			return obj[prop] === val;
		};
	};

	// Conver the above function to make it point free
	var eq = R.curry(function(val1, val2) {
		return (val1 === val2);
	});

	var propEqualsPointFree = R.useWith(R.pipe, dot, eq);

	function fetchData(memberName) {
		return fakeApiCall()
			.then(dot("tasks"))
			.then(R.filter(propEquals("member", memberName)))
			.then(R.reject(propEquals("complete", true)))
			.then(R.map(R.pick(["id", "dueDate", "title", "priority"])))
			.then(R.sortBy(dot("dueDate")));
	}

	function fetchDataWithCompose(memberName) {
		return fakeApiCall()
			.then(R.compose(R.sortBy(dot("dueDate")),
				R.map(R.pick(["id", "dueDate", "title", "priority"])),
				R.reject(propEqualsPointFree("complete", true)),
				R.filter(propEqualsPointFree("member", memberName)),
				dot("tasks")));
	}
});
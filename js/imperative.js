jQuery(document).ready(function($) {

	$("#btnGetTasks").click(function(e) {
		e.preventDefault();
		var memberName = $("#inputName").val();
		fetchData(memberName)
			.then(function(tasks) {
				displayResults(memberName, tasks);
			});
	});

	function fetchData(memberName) {
		return fakeApiCall()
			.then(function(data) {
				return data.tasks;
			})
			.then(function(tasks) {
				var results = [];
				for (var i = 0, len = tasks.length; i < len; i++) {
					if (tasks[i].member == memberName) {
						results.push(tasks[i]);
					}
				}
				return results;
			})
			.then(function(tasks) {
				var results = [];
				for (var i = 0, len = tasks.length; i < len; i++) {
					if (!tasks[i].complete) {
						results.push(tasks[i]);
					}
				}
				return results;
			})
			.then(function(tasks) {
				var results = [], task;
				for (var i = 0, len = tasks.length; i < len; i++) {
					task = tasks[i];
					results.push({
						id: task.id,
						dueDate: task.dueDate,
						title: task.title,
						priority: task.priority
					})
				}
				return results;
			})
			.then(function(tasks) {
				tasks.sort(function(first, second) {
					var val = (new Date(first.dueDate)) - (new Date(second.dueDate));
					return val;
				});
				return tasks;
			});
	}
});
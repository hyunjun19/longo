'use strict';

(function(context, $, _){
    $('[data-ax5layout]').ax5layout({
        onResize: function(){
            _.each(ax5.ui.grid_instance, function(grid){
                grid.setHeight('100%');
            });
        }
    });

    var resultGrid = new ax5.ui.grid();
    initResultGrid();

    ax5.ui.grid.formatter['json'] = function () {
        if (_.isEmpty(this.value)) return this.value;

        return JSON.stringify(this.value);
    };

    function initResultGrid(dynamicColumns) {
        resultGrid.setConfig({
            showLineNumber: true,
            target: $('[data-ax5grid="result-grid"]'),
            columns: dynamicColumns || [{ key: 'dummy', label: 'dummy' }]
        });
    }

    $('#btn-query-condition-add').click(function(e){
        e.preventDefault();

        var $q = $('#q');
        var queryField = $('#query-field').val();
        var queryCondition = $('#query-condition').val();
        var queryValue = $('#query-value').val();

        if (_.isEmpty(queryField) || _.isEmpty(queryValue)) {
            alert('field and value is require.');
            return;
        }

        var q = {};
        try {
            q = JSON.parse($q.val() || '{}');
        } catch(ex) {
            console.error('#q JSON.parse fail.', ex);
        }

        q[queryField] = {};
        q[queryField][queryCondition] = queryValue;

        $q.val(JSON.stringify(q, null, 4));
    });

    $('#btn-query').click(function(){
        var phase  = $('#phase').val();
        var bucket = $('#bucket').val();
        if (_.isEmpty(phase) || _.isEmpty(bucket)) {
            alert('select phase and bucket.');
            return;
        }

        var url = '/log/' + phase + '/' + bucket;
        var data = {
            q: $('#q').val(),
            c: $('#c').val(),
            limit: $('#limit').val()
        };
        $.get(url, data, function(res){
            location.href = '#res';

            if (_.isEmpty(res)) {
                initResultGrid();
                resultGrid.setData([]);
                return;
            }

            var dynamicColumns = _.map(res[0], function(val, key){
                return { 'key': key, 'label': key, 'formatter': 'json' };
            });
            initResultGrid(dynamicColumns);
            resultGrid.setData(res);
        }).fail(function(res){
            location.href = '#res';
            initResultGrid([{ key: 'error', label: 'error' }]);
            resultGrid.setData([ { error: res } ]);
        });
    });
})(window, jQuery, _.noConflict());
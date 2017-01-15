'use strict';
(function(context, $, _){
    $('[data-ax5layout]').ax5layout({
        onResize: function(){
            _.each(ax5.ui.grid_instance, function(grid){
                grid.setHeight('100%');
            });
        }
    });

    $('[name="phase"], [name="bucket"]').on('change', function(){
        var phase  = $('[name="phase"]:checked').val();
        var bucket = $('[name="bucket"]:checked').val();
        if (!phase || !bucket) return;

        query(phase, bucket);
    });

    $('#query-condition, #query-value, #btn-query').on('click change', function(){
        var phase     = $('[name="phase"]:checked').val();
        var bucket    = $('[name="bucket"]:checked').val();
        var field     = $('#query-field').val();
        var condition = $('#query-condition').val();
        var value     = $('#query-value').val();
        query(phase, bucket, field, condition, value);
    });

    ax5.ui.grid.formatter['json'] = function () {
        if (_.isObject(this.value)) return JSON.stringify(this.value);
        return this.value;
    };

    var resultGrid = new ax5.ui.grid();
    loadResultGrid();

    function loadQueryField(fields) {
        var fieldOptions = _.map(fields, function(field){
            return '<option value="{0}">{0}</option>'.format(field);
        });
        $('#query-field').empty().append(fieldOptions.join(''));
    }

    function loadResultGrid(dynamicColumns) {
        resultGrid.setConfig({
            showLineNumber: true,
            target: $('[data-ax5grid="result-grid"]'),
            columns: dynamicColumns || [{ key: 'dummy', label: 'dummy' }]
        });
    }

    function query(phase, bucket, field, condition, value) {
        if (!phase || !bucket) {
            alert('select phase and bucket.');
            return;
        }

        var $q = $('#q');
        var query = {};
        var applyCondition = !_.isEmpty(value);

        if (applyCondition) {
            query[field] = {};
            query[field][condition] = value;
        }

        $q.val(JSON.stringify(query, null, 4));

        var mask = new ax5.ui.mask();
        var url  = '/query/' + phase + '/' + bucket;
        var data = {
            query: $q.val(),
            sort:  '',
            limit: ''
        };

        mask.open({
            target: $('[data-ax5grid="result-grid"]').get(0),
            content: JSON.stringify(data, null, 4)
        });
        $.get(url, data, function(res){
            if (_.isEmpty(res)) {
                loadResultGrid();
                resultGrid.setData([]);
                return;
            }

            var keys = Object.keys(res[0]);
            var dynamicColumns = _.map(keys, function(key){
                return { 'key': key, 'label': key, 'sortable': true, 'formatter': 'json' };
            });

            if (!applyCondition) loadQueryField(keys);

            loadResultGrid(dynamicColumns);
            resultGrid.setData(res);

        }).fail(function(res){
            loadResultGrid([{ key: 'error', label: 'error' }]);
            resultGrid.setData([ { error: res } ]);
        }).always(function(){
            mask.close();
        });
    }
})(window, jQuery, _);

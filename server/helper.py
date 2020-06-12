def df_to_apex_data_single_gene(filtered_gene_df, actual):
    series = [
        {
            'name': data_type,
            'dataType': actual.loc[data_type]['Data type'],
            'data': [
                {
                    'x': val[0],  # sample ID
                    'y': val[1],  # color scale val
                    'value': actual[val[0]][data_type],
                    'gene': actual.loc[data_type]['Gene symbol'],
                }
                for val in vals.items()
            ]
        }
        for data_type, vals in filtered_gene_df.iterrows()
    ]
    for s in series:
        s['data'].insert(-7, {'x': 'separator', 'y': 1000, 'value': 'separator', 'gene': 'separator'})
    return series[::-1]

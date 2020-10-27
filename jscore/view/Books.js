/**
 * Список книг
 */
var me = this;
Ext.define('Swan.view.Books', {
	extend: 'Ext.grid.Panel',
	store: {
		proxy: {
			type: 'ajax',
			url: 'index.php/Book/loadList',
			reader: {
				type: 'json',
				idProperty: 'book_id'
			}
		},
		autoLoad: true,
		remoteSort: false,
		sorters: [{
			property: 'book_name',
			direction: 'ASC'
		}]
	},
	id: 'gridBook',
	defaultListenerScope: true,
	tbar: [{
		text: 'Добавить',
		handler: function() {
			// todo надо реализовать добавление

			Ext.create('Ext.window.Window', {
				title: 'Книга: Добавление',
				height: 250,
				width: 400,
				layout: 'fit',
				items: [
					{
						xtype: 'panel',
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 0 11',
										text: 'Автор',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'autorBook'
									}
								]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 15 11',
										text: 'Название',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'nameBook'
									}
								]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 15 11',
										text: 'Год издания',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'yearBook'
									}
								]
							},
						]
					}
				],
				buttons: {
					items: [
						'->',
						{
							text: 'Отмена',
							handler: function () {
								this.up('window').destroy();
							}
						},
						{
							text: 'Сохранить',
							handler: function () {
								var me = this;
								var autorBook = this.up('window').query('[name=autorBook]')[0].getValue();
								var nameBook = this.up('window').query('[name=nameBook]')[0].getValue();
								var yearBook = this.up('window').query('[name=yearBook]')[0].getValue();
								Ext.Ajax.request({
									url: 'index.php/Book/loadListAdd',
									params: {
										author_name: autorBook,
										book_name: nameBook,
										book_year: yearBook
									},
									callback: function (obj, success, response) {
										if(success) {
											var res = Ext.JSON.decode(response.responseText);
											if (res) {
												Ext.getCmp('gridBook').store.reload();
												me.up('window').destroy();
											}
										}
									}
								});
							}
						}
					]
				}
			}).show();
		}
	}, {
		text: 'Редактировать',
		itemId: 'editBook',
		handler: function() {
			// todo надо реализовать редактирование

			var window = Ext.create('Ext.window.Window', {
				title: 'Книга: Редактирование',
				height: 250,
				width: 400,
				layout: 'fit',
				listeners: {
					show: function() {
						var me = this, args = me.show.arguments[0];
						me.query('[name=autorBook]')[0].setValue(args.author_name);
						me.query('[name=nameBook]')[0].setValue(args.book_name);
						me.query('[name=yearBook]')[0].setValue(args.book_year);
						me.query('[name=idBook]')[0].setValue(args.book_id);
					}
				},
				items: [
					{
						xtype: 'panel',
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 0 11',
										text: 'Автор',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'autorBook'
									}
								]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 15 11',
										text: 'Название',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'nameBook'
									}
								]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'start',
									align: 'stretch'
								},
								defaults: {
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'label',
										margin: '0 0 15 11',
										text: 'Год издания',
										style: {
											paddingTop: '15px'
										},
										width: 85
									},
									{
										xtype: 'textfield',
										height: 42,
										width: 200,
										name: 'yearBook'
									}
								]
							},
							{
								name: 'idBook',
								xtype: 'textfield',
								style: {
									display: 'none'
								}
							}
						]
					}
				],
				buttons: {
					items: [
						'->',
						{
							text: 'Отмена',
							handler: function () {
								this.up('window').destroy();
							}
						},
						{
							text: 'Сохранить',
							handler: function () {
								var me = this;
								var autorBook = this.up('window').query('[name=autorBook]')[0].getValue();
								var nameBook = this.up('window').query('[name=nameBook]')[0].getValue();
								var yearBook = this.up('window').query('[name=yearBook]')[0].getValue();
								var idBook = this.up('window').query('[name=idBook]')[0].getValue();
								Ext.Ajax.request({
									url: 'index.php/Book/loadListEdit',
									params: {
										author_name: autorBook,
										book_name: nameBook,
										book_year: yearBook,
										book_id: idBook
									},
									callback: function (obj, success, response) {
										if(success) {
											var res = Ext.JSON.decode(response.responseText);
											if (res) {
												Ext.getCmp('gridBook').store.reload();
												me.up('window').destroy();
											}
										}
									}
								});
							}
						}
					]
				}
			});
			if (this.up('grid').getSelectionModel().getSelected().items.length > 0) {
				var params = this.up('grid').getSelectionModel().getSelected().items[0].data;
				window.show(params);
			}
		}
	}, {
		text: 'Удалить',
		handler: function() {
			// todo надо реализовать удаление
			if (this.up('grid').getSelectionModel().getSelected().items.length > 0) {
				var params = this.up('grid').getSelectionModel().getSelected().items[0].data;
				Ext.Ajax.request({
					url: 'index.php/Book/loadListDelete',
					params: {
						book_id: params.book_id
					},
					callback: function (obj, success, response) {
						if(success) {
							var res = Ext.JSON.decode(response.responseText);
							if (res) {
								Ext.getCmp('gridBook').store.reload();
								me.up('window').destroy();
							}
						}
					}
				});
			}
		}
	}, {
		text: 'Экспорт в XML',
		handler: function() {
			// todo надо реализовать удаление
			Ext.Ajax.request({
				url: 'index.php/Book/loadListXML',
				callback: function (obj, success, response) {
					if(success) {
						debugger;
						var res = response.responseText;
						if (res) {
							/*Ext.getCmp('gridBook').store.reload();
							me.up('window').destroy();*/
						}
					}
				}
			});
		}
	}],
	columns: [{
		dataIndex: 'author_name',
		text: 'Автор',
		width: 150
	}, {
		dataIndex: 'book_name',
		text: 'Название книги',
		flex: 1
	}, {
		dataIndex: 'book_year',
		text: 'Год издания',
		width: 150
	}]
});
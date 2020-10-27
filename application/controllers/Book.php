<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}
	public function loadListEdit()
	{
		$this->load->model('Book_model');
		$bookResponse = $this->Book_model->loadListEdit($_POST);
		echo json_encode($bookResponse);
	}
    public function loadListAdd()
    {
        $this->load->model('Book_model');
        $bookResponse = $this->Book_model->loadListAdd($_POST);
        echo json_encode($bookResponse);
    }
    public function loadListDelete()
    {
        $this->load->model('Book_model');
        $bookResponse = $this->Book_model->loadListDelete($_POST);
        echo json_encode($bookResponse);
    }
    public function loadListXML()
    {
        $this->load->model('Book_model');
        $bookResponse = $this->Book_model->loadListXML();
        echo json_encode($bookResponse);
    }
}

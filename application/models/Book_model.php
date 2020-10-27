<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		// todo реализовать получение списка книг из БД

        $this->load->database();
        if ($query = $this->db->query("SELECT * FROM book"))
        {
            foreach ($query->result_array() as $row)
            {
                $arrReturn[] = $row;
            }
        }
        return $arrReturn;
	}
	public function loadListEdit($post)
	{
        $this->load->database();
        $this->db->set('author_name', $post['author_name']);
        $this->db->set('book_name', $post['book_name']);
        $this->db->set('book_year', $post['book_year']);
        $this->db->where('book_id', $post['book_id']);
        $str = $this->db->update('book');
        if ($str)
        {
           $response = $str;
        } else {
            $response = false;
        }
        return $response;
	}
    public function loadListAdd($post)
    {
        $this->load->database();
        $array = array(
            'author_name' => $post['author_name'],
            'book_name' => $post['book_name'],
            'book_year' => $post['book_year']
        );
        $this->db->set($array);
        $str = $this->db->insert('book');
        if ($str)
        {
            $response = $str;
        } else {
            $response = false;
        }
        return $response;
    }
    public  function  loadListDelete($post)
    {
        $this->load->database();
        $str = $this->db->delete('book', array('book_id' => $post['book_id']));
        if ($str)
        {
            $response = $str;
        } else {
            $response = false;
        }
        return $response;
    }
	public function loadListXML()
	{
		$this->load->dbutil();

		$query = $this->db->query("SELECT * FROM book");

		$config = array (
			'root' => 'books',
			'element' => 'book',
			'newline' => "\n",
			'tab' => "\t"
		);

		echo $this->dbutil->xml_from_result($query, $config);
		/*$this->load->database();
		$res = $this->db->query('SELECT * FROM book');
		if ($res->num_rows() > 0)
		{
			$output =  '<?xml version="1.0" encoding="utf-8"?>'. "\n";
			$output .= "<books>\n";
			foreach ($res->result() as $item)
			{
				$output .= "<book>\n";
				$output .= "<id>".$item->book_id."</id>\n";
				$output .= "<name>".$item->book_name."</name>\n";
				$output .= "<author>".$item->author_name."</author>\n";
				$output .= "</book>\n";
			}
			$output .= '</books>';
		}
		echo $output;*/
	}
}

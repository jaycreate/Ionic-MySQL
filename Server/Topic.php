<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Topic extends CI_Controller {


	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		//$this->output->enable_profiler(TRUE);
	}



	public function populate($rows = 2500 )
	{

		$this->db->query('TRUNCATE TABLE `topics`');
		echo "<p>Truncated done</p>";

		$title = "This is an example topic title number: ";
		$msg = 'Here is a showcase of a card using several different items. It begins with the list card element, utilizing the item-avatar list item, an item-body element for images and text, and a footer with the item-divider classname.';

		for($i=1; $i<=$rows; $i++){

			$sql = "INSERT INTO `ionicdb`.`topics` (`id`, `title`, `message`, `name`, `posted`) ";
			$sql .= "VALUES (NULL, '$title $i', '$msg', 'Usr#$i', CURRENT_TIMESTAMP); ";
			$this->db->query($sql);

		}
		echo "<p>Data: ".($i-1). " recores created!</p>";
	}


	public function listtopic()
	{

		$params =  $this->input->get();
		$where = "";

		if(array_key_exists('after', $params)){
			log_message('info', 'after : ' . $params['after']);
			$where = "where id > " . $params['after'];
		}

		if(array_key_exists('before', $params)){
			log_message('info', 'before : ' . $params['before']);
			$where = "where id < " . $params['before'];
		}

		$sql = "select * from topics $where order by id desc limit 15";
		log_message('info', $sql);


		$query = $this->db->query($sql);		
		$result = $query->result();
		if($query->num_rows()>0)
		{	
			echo json_encode($result);
		}


	}


	public function newtopic()
	{
		
		$data = json_decode(file_get_contents('php://input'),true);
		if(!$data){
			echo "Please enter informations";
			exit;
		}

		//log_message('info', print_r($data['params'], true));

		// requires php5
		if(array_key_exists('picture', $data['params']))
		{
			define('UPLOAD_DIR', '/var/...../ionic/upload/'); // Change your path location here and change permission to 777 ***
			$img = $data['params']['picture'];
			$img = str_replace('data:image/jpeg;base64,', '', $img);
			$img = str_replace(' ', '+', $img);
			$dataimg = base64_decode($img);
			$filename = uniqid() . '.jpeg';
			$file = UPLOAD_DIR . $filename;
			$success = file_put_contents($file, $dataimg);
			$data['params']['picture'] = $filename;
			//log_message('info', $success ? $file : 'Unable to save the file.');
		}
		
		
		log_message('info', print_r($data['params'], true));

		if($this->db->insert('topics', $data['params'] ))
		{
			echo "success";
			exit;
		}else{
			echo "There is some error, can't push data into Database";
			exit;
		}
	}

	public function detail()
	{

		$data = json_decode(file_get_contents('php://input'),true);
		log_message('info', print_r($data['id'], TRUE));

		$sql = "select * from topics where id = " . $data['id'];
		log_message('info', $sql);

		$query = $this->db->query( $sql );
		$result = $query->result();
			
		if($query->num_rows()>0)
		{
			echo json_encode($result);

		}else{
			echo "Error";
		}
		
	}


}

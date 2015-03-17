<?php

namespace Organizer\Bundle\ClientBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class DefaultController
 * @package Organizer\Bundle\ClientBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return array
     * @Route("")
     * @Template()
     */
    public function indexAction()
    {
        return [];
    }
}
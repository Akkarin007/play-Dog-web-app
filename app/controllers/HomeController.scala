package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import dog._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var gameController = Dog.controller

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

   def house() = Action {
    Ok("house" + gameController.toStringHouse)
  }
  def load() = Action {
    Ok("load" + gameController.load)
  }
  def save() = Action {
    Ok("save" + gameController.save())
  }
  def undoCommand() = Action {
    Ok("undo" + gameController.undoCommand())
  }

  def redoCommand() = Action {
    Ok("redo" + gameController.redoCommand())
  }

  def doStep() = Action {
    Ok("doStep" + gameController.doStep())
  }

  def createNewBoard(size: Int) = Action {
    Ok("createNewBoard" + gameController.createNewBoard(size))
  }
  def playerhands() = Action {
    Ok("playerhands" + gameController.toStringPlayerHands)
  }
}

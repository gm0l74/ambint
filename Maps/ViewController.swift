// Copyright 2018 the FloatingPanel authors. All rights reserved. MIT license.

import UIKit
import MapKit
import FloatingPanel
import CoreData

class ViewController: UIViewController {
    
    // Core Data
    var container: NSPersistentContainer!
    func saveContext(backgroundContext: NSManagedObjectContext? = nil) {
        // improves performance by saving the context only when there are changes
        
        let context = container.viewContext
        guard context.hasChanges else { return }
        do {
            try context.save()
        } catch let error as NSError {
            print("Error: \(error), \(error.userInfo)")
        }
    }
    public func addBuilding (name: String, location:Int, occupation: Decimal) {
        let context = container.viewContext
        let b = NSEntityDescription.entity(forEntityName: "Building", in: context)
        let newB = NSManagedObject(entity: b! , insertInto: context)
        newB.setValue(name, forKey: "name")
        newB.setValue(location, forKey: "location")
        newB.setValue(occupation, forKey: "occupation")
        saveContext()
    }
    
    
    // Search Panel
    typealias PanelDelegate = FloatingPanelControllerDelegate & UIGestureRecognizerDelegate

    lazy var fpc = FloatingPanelController()
    lazy var fpcDelegate: PanelDelegate = SearchPanelPhoneDelegate(owner: self)
    lazy var searchVC =
        storyboard?.instantiateViewController(withIdentifier: "SearchViewController") as! SearchViewController
    
    var searchBarHeight = CGFloat(0);

    // Detail Panel
    lazy var detailFpc = FloatingPanelController()
    lazy var detailFpcDelegate: PanelDelegate = DetailPanelPhoneDelegate(owner: self)
    lazy var detailVC =
        storyboard?.instantiateViewController(withIdentifier: "DetailViewController") as! DetailViewController
    
    // Buildings
    
    @IBOutlet weak var torreSul: UIView!
    @IBOutlet weak var torreNorte: UIView!
    @IBOutlet weak var central: UIView!
    @IBOutlet weak var ae: UIView!
    @IBOutlet weak var informatica1: UIView!
    @IBOutlet weak var informatica2: UIView!
    @IBOutlet weak var mecanica: UIView!
    @IBOutlet weak var civil: UIView!
    @IBOutlet weak var jardimNorte: UIView!
    @IBOutlet weak var interdisciplinar: UIView!
    @IBOutlet weak var matematica: UIView!
    
    var roomLabelToSegue:String = ""
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard container != nil else {
            fatalError("This view needs a persistent container.")
        }
        // The persistent container is available.
        
        fpc.contentMode = .fitToBounds
        fpc.delegate = fpcDelegate
        fpc.set(contentViewController: searchVC)
        fpc.track(scrollView: searchVC.tableView)

        detailFpc.isRemovalInteractionEnabled = true
        detailFpc.set(contentViewController: detailVC)

        layoutPanelForPhone()

        setUpSearchView()
        setBuildingLights()
        
        setBuildingContextMenu(building:torreSul)
        setBuildingContextMenu(building:torreNorte)
        setBuildingContextMenu(building:central)
        setBuildingContextMenu(building:ae)
        setBuildingContextMenu(building:informatica1)
        setBuildingContextMenu(building:informatica2)
        setBuildingContextMenu(building:mecanica)
        setBuildingContextMenu(building:civil)
        setBuildingContextMenu(building:jardimNorte)
        setBuildingContextMenu(building:interdisciplinar)
        setBuildingContextMenu(building:matematica)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        // Must be here
        searchVC.searchBar.delegate = self
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
    }

    func layoutPanelForPhone() {
        fpc.track(scrollView: searchVC.tableView) // Only track the tabvle view on iPhone
        fpc.addPanel(toParent: self, animated: true)
        fpc.setAppearanceForPhone()
        detailFpc.setAppearanceForPhone()
    }
    
    
    // MARK: - Map Lights Traffic
    
    @IBOutlet weak var torreSul_light: UIImageView!
    @IBOutlet weak var torreNorte_light: UIImageView!
    @IBOutlet weak var central_light: UIImageView!
    
    @IBOutlet weak var ae_light: UIImageView!
    
    @IBOutlet weak var informatica1_light: UIImageView!
    @IBOutlet weak var informatica2_light: UIImageView!
    @IBOutlet weak var mecanica_light: UIImageView!
    
    @IBOutlet weak var civil_light: UIImageView!
    @IBOutlet weak var jardimNorte_light: UIImageView!
    
    @IBOutlet weak var interdisciplinar_light: UIImageView!
    @IBOutlet weak var matematica_light: UIImageView!
    
    private func setBuildingLights() {
        let examples = [
            "torreSul": 0.8,
            "torreNorte": 0.5,
            "central": 0.9,
            "ae": 0.3,
            "informatica1": 0.95,
            "informatica2": 0.5,
            "mecanica": 0.48,
            "civil": 0.95,
            "jardimNorte": 0.75,
            "interdisciplinar": 0.3,
            "matematica": 0.8
            ]
        
        for occupance in examples {
            var light = UIColor.systemGreen;
            if occupance.value >= 0.7 {
                light = UIColor.systemOrange
            }
            if occupance.value >= 0.9 {
                light = UIColor.systemRed
            }
            
            switch occupance.key {
            case "torreSul":
                torreSul_light.tintColor = light
            case "torreNorte":
                torreNorte_light.tintColor = light
            case "central":
                central_light.tintColor = light
            case "ae":
                ae_light.tintColor = light
            case "informatica1":
                informatica1_light.tintColor = light
            case "informatica2":
                informatica2_light.tintColor = light
            case "mecanica":
                mecanica_light.tintColor = light
            case "civil":
                civil_light.tintColor = light
            case "jardimNorte":
                jardimNorte_light.tintColor = light
            case "interdisciplinar":
                interdisciplinar_light.tintColor = light
            case "matematica":
                matematica_light.tintColor = light
            default:
                break
            }
        }
    }

    
    // MARK: - Building Context Menus
    
    func setBuildingContextMenu(building:UIView) {
        
        //let tap = UITapGestureRecognizer(target: self, action: #selector(tappedBuilding(_:)))
        //building.addGestureRecognizer(tap)
        
        let menuInteraction = UIContextMenuInteraction(delegate: self)
        building.addInteraction(menuInteraction)
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.destination is RoomViewController {
            let vc = segue.destination as? RoomViewController
            vc?.roomLabel = self.roomLabelToSegue
        }
    }


}

extension ViewController: UIContextMenuInteractionDelegate {
    
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
        
        return UIContextMenuConfiguration(
            identifier: nil,
            previewProvider: nil) { _  in
            
            // HTTP Request
            let roomLabels:Array<String> = self.GET_rooms(building:"torreSul")
            
            var actions:Array<UIAction> = []
            
            for label in roomLabels {
                let action = UIAction(title: label) { _ in
                    self.roomLabelToSegue = label
                    self.performSegue(withIdentifier: "roomViewSegue", sender: self)
                }
                actions.append(action)
            }
            
            return UIMenu(title: "Torre Sul e Pav. de Química", children: actions)
            }
    }

}








// MARK: - Floating Panel

extension FloatingPanelController {
    func setAppearanceForPhone() {
        let appearance = SurfaceAppearance()
        if #available(iOS 13.0, *) {
            appearance.cornerCurve = .continuous
        }
        appearance.cornerRadius = 8.0
        appearance.backgroundColor = .clear
        surfaceView.appearance = appearance
    }
}

// MARK: - UISearchBarDelegate

extension ViewController: UISearchBarDelegate {
    func activate(searchBar: UISearchBar) {
        // make search bar disapear
        searchBar.isHidden = true
        searchBar.resignFirstResponder()
        //self.searchBarHeight = searchBar.frame.height
        //searchBar.height(CGFloat(0))
        
        // hide favourites
        searchVC.tableView.isHidden = true
        
        // show search objects
        searchVC.showHeader(animated: true)
        detailVC.dismiss(animated: true, completion: nil)
    }
    func deactivate(searchBar: UISearchBar) {
        // make search bar appear
        searchBar.isHidden = false
        //searchBar.height(self.searchBarHeight)
        
        // show favourites
        searchVC.tableView.isHidden = false
        
        // hide search objects
        searchVC.hideHeader(animated: true)
    }

    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        deactivate(searchBar: searchBar)
        UIView.animate(withDuration: 0.25) {
            self.fpc.move(to: .half, animated: false)
        }
    }

    func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {
        activate(searchBar: searchBar)
        UIView.animate(withDuration: 0.25) { [weak self] in
            self?.fpc.move(to: .full, animated: false)
        }
    }
}

// MARK: - iPhone

class SearchPanelPhoneDelegate: NSObject, FloatingPanelControllerDelegate, UIGestureRecognizerDelegate {
    unowned let owner: ViewController

    init(owner: ViewController) {
        self.owner = owner
    }

    func floatingPanel(_ vc: FloatingPanelController, layoutFor newCollection: UITraitCollection) -> FloatingPanelLayout {
            let appearance = vc.surfaceView.appearance
            appearance.borderWidth = 0.0
            appearance.borderColor = nil
            vc.surfaceView.appearance = appearance
            return SearchPanelPortraitLayout()
    }

    func floatingPanelDidMove(_ vc: FloatingPanelController) {
        //debugPrint("surfaceLocation: ", vc.surfaceLocation)
        let loc = vc.surfaceLocation

        if vc.isAttracting == false {
            let minY = vc.surfaceLocation(for: .full).y - 6.0
            let maxY = vc.surfaceLocation(for: .tip).y + 6.0
            vc.surfaceLocation = CGPoint(x: loc.x, y: min(max(loc.y, minY), maxY))
        }

        let tipY = vc.surfaceLocation(for: .tip).y
        if loc.y > tipY - 44.0 {
            let progress = max(0.0, min((tipY  - loc.y) / 44.0, 1.0))
            owner.searchVC.tableView.alpha = progress
        } else {
            owner.searchVC.tableView.alpha = 1.0
        }
        //debugPrint("NearbyState : ",vc.nearbyState)
    }

    func floatingPanelWillBeginDragging(_ vc: FloatingPanelController) {
        if vc.state == .full {
            owner.searchVC.searchBar.showsCancelButton = false
            owner.searchVC.searchBar.resignFirstResponder()
        }
    }

    func floatingPanelWillEndDragging(_ vc: FloatingPanelController, withVelocity velocity: CGPoint, targetState: UnsafeMutablePointer<FloatingPanelState>) {
        if targetState.pointee != .full {
            //owner.searchVC.hideHeader(animated: true)
            // make search bar appearr
            owner.deactivate(searchBar: owner.searchVC.searchBar)
        }
        if targetState.pointee == .tip {
            vc.contentMode = .static
        }
    }

    func floatingPanelDidEndAttracting(_ fpc: FloatingPanelController) {
        fpc.contentMode = .fitToBounds
    }
}

class SearchPanelPortraitLayout: FloatingPanelLayout {
    let position: FloatingPanelPosition  = .bottom
    let initialState: FloatingPanelState = .half
    var anchors: [FloatingPanelState : FloatingPanelLayoutAnchoring] {
        return [
            .full: FloatingPanelLayoutAnchor(absoluteInset: 18.0, edge: .top, referenceGuide: .safeArea),
            .half: FloatingPanelLayoutAnchor(fractionalInset: 0.27, edge: .bottom, referenceGuide: .safeArea),
            .tip: FloatingPanelLayoutAnchor(absoluteInset: 69.0, edge: .bottom, referenceGuide: .safeArea),
        ]
    }
    
    open func prepareLayout(surfaceView: UIView, in view: UIView) -> [NSLayoutConstraint] {
        return [
            surfaceView.leftAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leftAnchor, constant: 0.0),
            surfaceView.rightAnchor.constraint(equalTo: view.safeAreaLayoutGuide.rightAnchor, constant: 0.0),
        ]
    }
    
    func backdropAlpha(for state: FloatingPanelState) -> CGFloat {
        return 0.0
    }
}


class DetailPanelPhoneDelegate: NSObject, FloatingPanelControllerDelegate, UIGestureRecognizerDelegate {
    unowned let owner: ViewController

    init(owner: ViewController) {
        self.owner = owner
    }
}

class DetailPanelPhoneLayout: FloatingPanelLayout {
    let position: FloatingPanelPosition  = .bottom
    var anchors: [FloatingPanelState : FloatingPanelLayoutAnchoring] {
        return [
            .full: FloatingPanelLayoutAnchor(fractionalInset: 0.5, edge: .bottom, referenceGuide: .safeArea),
        ]
    }
    let initialState: FloatingPanelState = .full
    func backdropAlpha(for state: FloatingPanelState) -> CGFloat {
        return 0.0
    }
}



// MARK: - HTTP Requests


extension ViewController {
    

    private func GET_METHOD(apiUrl: URL) -> String {
        var request = URLRequest(url: apiUrl)
        request.httpMethod = "GET"
        let session = URLSession.shared
        
        var _fetched:String = ""
        
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print("Error:", error)
            } else if let data = data {
                _fetched = data.base64EncodedString()
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
        
        return _fetched
    }
    
    private func GET_rooms(building:String) -> Array<String> {
        print("MAKING REQUEST...")
        let url = URL(string: "https://ambint.herokuapp.com/api?type=buildings&name=" + building)!
        let data:String = GET_METHOD(apiUrl:url)
        
        // TODO: unwrap data -> number
        print("Received:", data)
        
        return ["Bilioteca DBE", "LTI Q5.2", "LTI Q5.3"]  // example
    }
    
    
}

// Copyright 2018 the FloatingPanel authors. All rights reserved. MIT license.

import UIKit

// MARK: - UITableViewDelegate

extension ViewController: UITableViewDelegate {
    func setUpSearchView() {
        searchVC.loadViewIfNeeded()
        searchVC.tableView.delegate = self
        searchVC.searchBar.placeholder = "Procurar lugares ou mesas"
        searchVC.items = [
            .init(roomName: "Biblioteca Central", location: "Pavilhão Central, Pisos 1 e 2", occupancyLevel: "GreenOccupancy", freeSpots: 12),
            
            .init(roomName: "Sala de Estudo de Matemática", location: "Pavilhão de Matemática e Física, Piso 1", occupancyLevel: "RedOccupancy", freeSpots: 1),
        ]
        /*
        searchVC.items.append(contentsOf: (0...98).map {
            .init(mark: "like", title: "Favorites", subtitle: "\($0) Places")
        })
        */
    }

    // metodo para acionar clique sobre uma biblioteca nos atalhos
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        tableView.deselectRow(at: indexPath, animated: true)

        deactivate(searchBar: searchVC.searchBar)

        // Show a detail panel
        // aqui nao queremos um painel de detalhes, mas sim abrir uma Room Page
        
        self.performSegue(withIdentifier: "roomViewSegue", sender: self)
    }
}

// MARK: - Models

struct RoomItem {
    let occupancyLevel: String
    let roomName: String
    let location: String
    let freeSpots: Int

    init(roomName: String, location: String, occupancyLevel: String, freeSpots: Int) {
        self.occupancyLevel = occupancyLevel
        self.roomName = roomName
        self.location = location
        self.freeSpots = freeSpots
    }
}

// MARK: - Visual Effects and Table View Data Source

class SearchViewController: UIViewController, UITableViewDataSource {
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var searchBar: UISearchBar!
    @IBOutlet weak var visualEffectView: UIVisualEffectView!
    @IBOutlet weak var searchObjectsContainer: UIView!
    

    var items: [RoomItem] = []

    // For iOS 10 only
    private lazy var shadowLayer: CAShapeLayer = CAShapeLayer()

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        searchBar.setSearchText(fontSize: 15.0)

        hideHeader(animated: false)
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        if #available(iOS 11, *) {
        } else {
            // Exmaple: Add rounding corners on iOS 10
            visualEffectView.layer.cornerRadius = 9.0
            visualEffectView.clipsToBounds = true

            // Exmaple: Add shadow manually on iOS 10
            view.layer.insertSublayer(shadowLayer, at: 0)
            let rect = visualEffectView.frame
            let path = UIBezierPath(roundedRect: rect,
                                    byRoundingCorners: [.topLeft, .topRight],
                                    cornerRadii: CGSize(width: 9.0, height: 9.0))
            shadowLayer.frame = visualEffectView.frame
            shadowLayer.shadowPath = path.cgPath
            shadowLayer.shadowColor = UIColor.black.cgColor
            shadowLayer.shadowOffset = CGSize(width: 0.0, height: 1.0)
            shadowLayer.shadowOpacity = 0.2
            shadowLayer.shadowRadius = 3.0
        }
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return "Favourites"
    }

    
    // creates and returns a cell para a vista de Atalhos
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        if let cell = cell as? SearchCell, let item = items[safe: indexPath.row] {
            cell.iconImageView.image = UIImage(named: item.occupancyLevel)
            cell.titleLabel.text = item.roomName
            cell.subTitleLabel.text = item.location
            cell.freeSpots.text = String(item.freeSpots)
        }
        return cell
    }

    func showHeader(animated: Bool) {
        changeHeader(height: 300.0, aniamted: animated)
        changeShortcuts(height: 0.0, animated: animated)
        searchObjectsContainer.isHidden = false
        
    }

    func hideHeader(animated: Bool) {
        changeHeader(height: 0.0, aniamted: animated)
        searchObjectsContainer.isHidden = true
    }

    // o header era originalmente os atalhos de comida, shopping, etc.
    private func changeHeader(height: CGFloat, aniamted: Bool) {
        guard let headerView = tableView.tableHeaderView, headerView.bounds.height != height else { return }
        if aniamted == false {
            updateHeader(height: height)
            return
        }
        tableView.beginUpdates()
        UIView.animate(withDuration: 0.25) {
            self.updateHeader(height: height)
        }
        tableView.endUpdates()
    }

    private func updateHeader(height: CGFloat) {
        guard let headerView = tableView.tableHeaderView else { return }
        var frame = headerView.frame
        frame.size.height = height
        self.tableView.tableHeaderView?.frame = frame
    }
    
    private func changeShortcuts(height: CGFloat, animated: Bool) {
        /*guard let shortcutsView = tableView.tableHeaderView, headerView.bounds.height != height else { return }
        if aniamted == false {
            updateHeader(height: height)
            return
        }
        tableView.beginUpdates()
        UIView.animate(withDuration: 0.25) {
            self.updateHeader(height: height)
        }
        tableView.endUpdates()*/
    }

    private func updateShortcuts(height: CGFloat) {
        /*
        guard let headerView = tableView.tableHeaderView else { return }
        var frame = headerView.frame
        frame.size.height = height
        self.tableView.tableHeaderView?.frame = frame
         */
    }
}

class SearchCell: UITableViewCell {
    @IBOutlet weak var iconImageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var subTitleLabel: UILabel!
    @IBOutlet weak var freeSpots: UILabel!
}

class SearchHeaderView: UIView {
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.clipsToBounds = true
    }
}

extension UISearchBar {
    func setSearchText(fontSize: CGFloat) {
        if #available(iOS 13, *) {
            let font = searchTextField.font
            searchTextField.font = font?.withSize(fontSize)
        } else {
            let textField = value(forKey: "_searchField") as! UITextField
            textField.font = textField.font?.withSize(fontSize)
        }
    }
}

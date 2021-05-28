//
//  RoomPageViewController.swift
//  Maps
//
//  Created by João Saraiva on 30/03/2021.
//  Copyright © 2021 scenee. All rights reserved.
//

import UIKit
import Charts
import TinyConstraints

class RoomViewController: UIViewController {
    
    // Variables from segues
    var roomLabel:String = ""
    
    // Views
    @IBOutlet weak var roomNameLabel: UILabel!
    @IBOutlet private weak var contentView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var stackView: UIStackView!
    @IBOutlet private weak var freeSpotsView: UIView!
    @IBOutlet private weak var freeTablesView: UIView!
    @IBOutlet private weak var roomMapView: UIView!
    @IBOutlet private weak var chartView: LineChartView!
    @IBOutlet private weak var chartWrapper: UIView!
    @IBOutlet weak var chartTimeControl: UISegmentedControl!
    @IBOutlet private weak var propertiesView: UIView!
    @IBOutlet private weak var propertiesTableContainer: UIView!
    
    // Counters and Arrows
    @IBOutlet private weak var freeSpotsCounter: UILabel!
    private var freeSpots: Int = 0 { didSet { // update the label by adding a property observer to the variable
        freeSpotsCounter.text = "\(freeSpots)" }}
    @IBOutlet private weak var freeTablesCounter: UILabel!
    private var freeTables: Int = 0 { didSet { // update the label by adding a property observer to the variable
        freeTablesCounter.text = "\(freeTables)" }}
    @IBOutlet private weak var freeSpotsArrow: UIImageView!
    @IBOutlet private weak var FreeTablesArrow: UIImageView!
    
    // Getters and Setters
    private func incrementFreeSpots() { freeSpots += 1 }
    private func decrementFreeSpots() { freeSpots -= 1 }
    private func setFreeSpots(n: Int) { freeSpots = n }
    private func getFreeSpots() -> Int { return freeSpots }
    
    private func incrementFreeTables() { freeTables += 1 }
    private func decrementFreeTables() { freeTables -= 1 }
    private func setFreeTables(n: Int) { freeTables = n }
    private func getFreeTables() -> Int { return freeTables }
    
    // Floor Control variables
    private var floorNames:Array<String> = []
    private var floorViews:Array<UIViewController> = []
    private var floorSpots:Dictionary<String,Dictionary<Int, UIButton>> = [:]
    private var currentFloorIndex:Int = 0
    
    
    // Chart time Segments
    @IBAction func timeSegmentChanged(_ sender: UISegmentedControl) {
        switch chartTimeControl.selectedSegmentIndex {
            case 0: plotDailyOccupation();
            case 1: plotWeeklyOccupation();
            case 2: plotMonthlyOccupation();
            case 3: plotYearlyOccupation();
            default: break;
            }
    }
    
    
    
    // Did Load
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        designDetails()
        
        // Pipeline
        roomNameLabel.text = roomLabel
        init_conters()
        init_roomMaps()
        init_charts()
        init_properties()
        
    }

    // Initializers
    private func init_conters() {
        
        // HTTP requests
        let fetched_freeSpots:Int = GET_freeSpots()
        let fetched_freeTables:Int = GET_freeTables()

        // initialize the counters observers
        setFreeSpots(n: fetched_freeSpots)
        setFreeTables(n: fetched_freeTables)
    }
    
    private func init_roomMaps() {
        
        // HTTP request
        floorNames = GET_floorNames()
    
        // get view for each floor
        for floor in floorNames {
            
            guard let floorView = storyboard?.instantiateViewController(identifier: "Biblioteca DBE - " + floor) else {
                return
            }
            
            floorViews.append(floorView)
        }
        
        // initalize page view controller and set floor views
        currentFloorIndex = 0  // starts on the first on of the list, by convention
        configurePageViewController()
        
        
        // get spots dict for each floor view and mark wich ones are free
        for f in 0...floorNames.count-1 {
            let name = floorNames[f]
            floorSpots[name] = getFloorSpots(floor: f)
            
            let freeSpots = GET_freeSpots(floor: floorNames[f])
            
            for spot in freeSpots {
                floorSpots[name]?[spot]?.tintColor = .systemGreen
            }
        }
        
    }
    
    private func init_charts() {
        
        plotWeeklyOccupation() // just to start
        chartTimeControl.selectedSegmentIndex = 1 // just to start
    }
    
    private func init_properties() {
        
        // Properties
        weak var proprietiesTable = propertiesTableContainer.subviews[0] as? UITableView
        let tableDataSource = proprietiesTable!.dataSource as! PropertiesTableViewController
        
        // Basta definir aqui as propriedades
        let properities = ["books", "printers", "individual", "group", "windows"]
        tableDataSource.items = properities
        
        // Gerir as alturas aqui
        let tableHeight = CGFloat(proprietiesTable!.rowHeight * CGFloat(properities.count))
        propertiesTableContainer.height(tableHeight)
        propertiesView.height(CGFloat(tableHeight + 166))
    }
    
    
    // MARK: - Design Details

    private func designDetails() {
        
        // Round corners
        freeSpotsView.layer.cornerRadius = 10;
        freeSpotsView.layer.masksToBounds = true;
        freeTablesView.layer.cornerRadius = 10;
        freeTablesView.layer.masksToBounds = true;
        roomMapView.layer.cornerRadius = 10;
        roomMapView.layer.masksToBounds = true;
        chartWrapper.layer.cornerRadius = 10;
        chartWrapper.layer.masksToBounds = true;
        propertiesView.layer.cornerRadius = 10;
        propertiesView.layer.masksToBounds = true;
        
        // Initalize occupation chart
        chartView.legend.enabled = false
        // Y axis
        chartView.leftAxis.enabled = false
        chartView.rightAxis.labelFont = .systemFont(ofSize: 14)
        chartView.rightAxis.setLabelCount(4, force: false)
        chartView.rightAxis.labelTextColor = .secondaryLabel
        chartView.rightAxis.axisLineColor = .secondaryLabel
        chartView.rightAxis.labelPosition = .outsideChart
        chartView.rightAxis.valueFormatter = PercentageFormatter()
        // X axis
        chartView.xAxis.labelFont = .systemFont(ofSize: 14)
        chartView.xAxis.labelTextColor = .secondaryLabel
        chartView.xAxis.axisLineColor = .secondaryLabel
        chartView.xAxis.labelPosition = .bottom
        
    }
    
}



// MARK: - Room Map View Controllers

extension RoomViewController: UIPageViewControllerDelegate, UIPageViewControllerDataSource {
    
    // Initialization code
    
    func configurePageViewController() {
        
        guard let pageViewController = storyboard?.instantiateViewController(identifier: String(describing: CustomPageViewController.self)) as? CustomPageViewController else {
            return
        }
        
        pageViewController.delegate = self
        pageViewController.dataSource = self
        
        addChild(pageViewController)
        pageViewController.didMove(toParent: self)
        
        pageViewController.view.translatesAutoresizingMaskIntoConstraints = false
        roomMapView.addSubview(pageViewController.view)
        
        let views: [String: Any] = ["pageView": pageViewController.view]
        
        roomMapView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-0-[pageView]-0-|", options: NSLayoutConstraint.FormatOptions(rawValue: 0), metrics: nil, views: views))
        
        roomMapView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-0-[pageView]-0-|", options: NSLayoutConstraint.FormatOptions(rawValue: 0), metrics: nil, views: views))
        
        guard let startingViewController = detailViewControllerAt(index: currentFloorIndex) else {
            return
        }
        
        pageViewController.setViewControllers([startingViewController], direction: .forward, animated: true)
        
    }
    
    func detailViewControllerAt(index: Int) -> RoomMapViewController? {
        
        if index >= floorNames.count || floorNames.count == 0 {
            return nil
        }
        
        guard let roomMapViewController = storyboard?.instantiateViewController(identifier: String(describing: RoomMapViewController.self)) as? RoomMapViewController else {
            return nil
        }
        
        roomMapViewController.index = index
        
        // set floor name
        roomMapViewController.setFloorName(name: floorNames[index])
        
        // set floor view
        roomMapViewController.setFloorMap(floorViewController: floorViews[index])
        
        return roomMapViewController
    }
    
    
    // Code to control the floor on the map
    
    func presentationIndex(for pageViewController: UIPageViewController) -> Int {
        return currentFloorIndex
    }
    
    func presentationCount(for pageViewController: UIPageViewController) -> Int {
        return floorNames.count
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        
        let roomMapViewController = viewController as? RoomMapViewController
        
        guard var currentIndex = roomMapViewController?.index else {
            return nil
        }
        
        if currentIndex == 0 {
            return nil
        }
        
        currentIndex -= 1
        
        currentFloorIndex = currentIndex
        
        return detailViewControllerAt(index: currentIndex)
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        
        let roomMapViewController = viewController as? RoomMapViewController
        
        guard var currentIndex = roomMapViewController?.index else {
            return nil
        }
        
        if currentIndex == floorNames.count {
            return nil
        }
        
        currentIndex += 1
        
        currentFloorIndex = currentIndex
        
        return detailViewControllerAt(index: currentIndex)
    }
    
    func getFloorSpots(floor:Int) -> Dictionary<Int,UIButton> {
        var spots:Dictionary<Int,UIButton> = [:]
        getAllButtonFromView(view:floorViews[floor].view, spots:&spots)
        return spots
    }
    
    func getAllButtonFromView(view:UIView, spots: inout Dictionary<Int,UIButton>) {
        for subview in view.subviews {
            if (subview.subviews.count > 0) {
                print("found subview with more subviews", subview)
                getAllButtonFromView(view: subview, spots: &spots)
            }
            else if (subview is UIButton) {
                print("found subview with button")
                spots[subview.tag] = (subview as! UIButton)  // set the tag of each spot on the storyboard
            }
        }
    }
    
}



// MARK: - Charts Controller

// Code to control the chart
extension RoomViewController: ChartViewDelegate {
    
    func chartValueSelected(_ chartView: ChartViewBase, entry: ChartDataEntry, highlight: Highlight) {
        print(entry)
    }
    
    // Main setter
    func setChartData(data: [ChartDataEntry]) {
        let set1 = LineChartDataSet(entries: data, label: "Occupation")
        set1.drawCirclesEnabled = false
        set1.mode = .cubicBezier
        set1.lineWidth = 3
        set1.setColor(.systemGreen)
        set1.drawHorizontalHighlightIndicatorEnabled = false
        set1.drawVerticalHighlightIndicatorEnabled = false
        
        chartView.animate(yAxisDuration: 1.0)
        
        let data = LineChartData(dataSet: set1)
        data.setDrawValues(false)
        chartView.data = data

    }
    
    // Four plot types
    
    func plotDailyOccupation() {
        print("Plotting daily occupation")
        
        // experimental data for chart
        let experimentalValues: [ChartDataEntry] = [
            ChartDataEntry(x:7, y:0.36),
            ChartDataEntry(x:8, y:0.64),
            ChartDataEntry(x:9, y:0.76),
            ChartDataEntry(x:10, y:0.35),
            ChartDataEntry(x:11, y:0.64),
            ChartDataEntry(x:12, y:0.53),
            ChartDataEntry(x:13, y:0.84),
        ]
        
        setChartData(data: experimentalValues)
        chartView.xAxis.valueFormatter = nil
        chartView.xAxis.setLabelCount(experimentalValues.count, force: true)
    }
    
    func plotWeeklyOccupation() {
        print("Plotting weekly occupation")
        
        // experimental data for chart
        let experimentalValues: [ChartDataEntry] = [
            ChartDataEntry(x:1.0, y:0.11),
            ChartDataEntry(x:2.0, y:0.4),
            ChartDataEntry(x:3.0, y:0.76),
            ChartDataEntry(x:4.0, y:0.23),
            ChartDataEntry(x:5.0, y:0.43),
            ChartDataEntry(x:6.0, y:0.56),
            ChartDataEntry(x:7.0, y:0.25),
        ]
        
        setChartData(data: experimentalValues)
        chartView.xAxis.valueFormatter = WeekDaysFormatter()
        chartView.xAxis.setLabelCount(7, force: true)
    }
    
    func plotMonthlyOccupation() {
        print("Plotting monthly occupation")
        
        // experimental data for chart
        let experimentalValues: [ChartDataEntry] = [
            ChartDataEntry(x:7, y:0.349),
            ChartDataEntry(x:8, y:0.632),
            ChartDataEntry(x:9, y:0.03),
            ChartDataEntry(x:10, y:0.35),
            ChartDataEntry(x:11, y:0.64),
            ChartDataEntry(x:12, y:0.2349),
            ChartDataEntry(x:1, y:0.21),
        ]
        
        setChartData(data: experimentalValues)
        chartView.xAxis.valueFormatter = MonthsFormatter()
        chartView.xAxis.setLabelCount(experimentalValues.count, force: true)
    }
    
    func plotYearlyOccupation() {
        print("Plotting yearly occupation")
    }
}

// X-axis Formatters

class WeekDaysFormatter : IAxisValueFormatter {
    func stringForValue(_ value: Double, axis: AxisBase?) -> String {
        switch value {
        case 1.0:
            return "dom."
        case 2.0:
            return "seg."
        case 3.0:
            return "ter."
        case 4.0:
            return "qua."
        case 5.0:
            return "qui."
        case 6.0:
            return "sex."
        case 7.0:
            return "sab."
        default:
            return "n.d."
        }
    }
}

class MonthsFormatter : IAxisValueFormatter {
    func stringForValue(_ value: Double, axis: AxisBase?) -> String {
        switch value {
        case 1.0:
            return "J"
        case 2.0:
            return "F"
        case 3.0:
            return "M"
        case 4.0:
            return "A"
        case 5.0:
            return "M"
        case 6.0:
            return "J"
        case 7.0:
            return "J"
        case 8.0:
            return "A"
        case 9.0:
            return "S"
        case 10.0:
            return "O"
        case 11.0:
            return "N"
        case 12.0:
            return "D"
        default:
            return "n.d."
        }
    }
}

class PercentageFormatter : IAxisValueFormatter {
    func stringForValue(_ value: Double, axis: AxisBase?) -> String {
        return String(Int(value*100)) + "%"
    }
}




// MARK: - Properties Controller

class PropertiesTableViewController: UITableViewController {
    
    var items: [String] = []
    
    override func numberOfSections(in tableView: UITableView) -> Int {
       return 1
    }
       
    override func tableView(_ tableView: UITableView,
                            numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // Ask for a cell of the appropriate type
        let property = items[safe: indexPath.row]! as String
        let cell = tableView.dequeueReusableCell(withIdentifier: property, for: indexPath)
        return cell
    }
}



// MARK: - HTTP Requests


extension RoomViewController {
    

    private func GET_METHOD(apiUrl: URL) -> String {
        let url = URL(string: "https://www.myapi.com/v1/user")!
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        let session = URLSession.shared
        
        var _fetched:String = ""
        
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                // Handle HTTP request error
            } else if let data = data {
                _fetched = data.base64EncodedString()
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
        
        return _fetched
    }
    
    private func GET_freeSpots() -> Int {
        let url = URL(string: "https://www.myapi.com/v1/user")!
        let data:String = GET_METHOD(apiUrl:url)
        
        // TODO: unwrap data -> number
        
        return 20  // example
    }
    
    private func GET_freeTables() -> Int {
        let url = URL(string: "https://www.myapi.com/v1/user")!
        let data:String = GET_METHOD(apiUrl:url)
        
        // TODO: unwrap data -> number
        
        return 7  // example
    }
    
    private func GET_floorNames() -> Array<String> {
        let url = URL(string: "https://www.myapi.com/v1/user")!
        let data:String = GET_METHOD(apiUrl:url)
        
        // TODO: unwrap data -> Array<String>
        
        return ["Sala Principal", "Sala de Leitura"] // example
    }
    
    private func GET_freeSpots(floor:String) -> Array<Int> {
        let url = URL(string: "https://www.myapi.com/v1/user")!
        let data:String = GET_METHOD(apiUrl:url)
        
        // TODO: unwrap data -> Array<String>
        
        return [4, 9, 12, 13, 23, 27] // example
    }
    
    
    
}

